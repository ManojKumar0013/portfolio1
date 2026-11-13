import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fontJson from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export const ROBOT_LABELS = [
  { id: 'about', text: 'ABOUT ME', color: '#4de8ff', light: '#0891b2', pos: [-1.9, 2.7] },
  { id: 'skills', text: 'SKILLS', color: '#ff5ec8', light: '#c0268a', pos: [1.9, 2.7] },
  { id: 'projects', text: 'PROJECTS', color: '#ffe14d', light: '#b88900', pos: [-1.9, 4.4] },
  { id: 'contact', text: 'CONTACT', color: '#ff7a3d', light: '#d9480f', pos: [1.9, 4.4] },
];

const THEMES = {
  dark: { bg: '#1d1d1b', floor: '#232321', grid1: '#77756d', grid2: '#45443f', hemi: 1.1 },
  light: { bg: '#e9e5da', floor: '#e4dfd2', grid1: '#8f8b80', grid2: '#c9c4b6', hemi: 1.6 },
};

const L1 = 2.8, L2 = 2.5, GRIP = 0.9, SHOULDER_Y = 1.0;
const FRONT_YAW = Math.atan2(6.5, 9) - 0.6;
const FRONT_YAW_NARROW = Math.atan2(0.3, 17.5) - 0.35;
const IDLE = { yaw: 0, sh: -0.25, el: -0.95, wr: -0.6, grip: 0.24 };

function solveIK(x, z, y) {
  const yaw = Math.atan2(-z, x);
  const d = Math.hypot(x, z);
  const h = y - SHOULDER_Y;
  const r = Math.min(Math.max(Math.hypot(d, h), 0.6), L1 + L2 - 0.05);
  const cosE = (r * r - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const e = Math.acos(Math.min(1, Math.max(-1, cosE)));
  const phi = Math.atan2(d, h);
  const alpha = Math.atan2(L2 * Math.sin(e), L1 + L2 * Math.cos(e));
  const s = phi - alpha;
  return { yaw, sh: -s, el: -e, wr: -(Math.PI - (s + e)) };
}

function box(w, h, d, mat, y = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.y = y;
  m.castShadow = true;
  return m;
}

function buildArm(mats) {
  const root = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.5, 0.35, 48), mats.dark);
  base.position.y = 0.175; base.castShadow = true; base.receiveShadow = true;
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.33, 1.33, 0.05, 48), mats.accent);
  ring.position.y = 0.33;
  root.add(base, ring);

  const yaw = new THREE.Group(); yaw.position.y = 0.35; root.add(yaw);
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.55, 32), mats.white);
  turret.position.y = 0.27; turret.castShadow = true; yaw.add(turret);

  const shoulder = new THREE.Group(); shoulder.position.y = 0.65; yaw.add(shoulder);
  const sj = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.9, 24), mats.dark);
  sj.rotation.x = Math.PI / 2; shoulder.add(sj);
  shoulder.add(box(0.45, L1, 0.45, mats.white, L1 / 2));

  const elbow = new THREE.Group(); elbow.position.y = L1; shoulder.add(elbow);
  const ej = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.7, 24), mats.dark);
  ej.rotation.x = Math.PI / 2; elbow.add(ej);
  const eRing = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.12, 24), mats.accent);
  eRing.rotation.x = Math.PI / 2; elbow.add(eRing);
  elbow.add(box(0.36, L2, 0.36, mats.white, L2 / 2));

  const wrist = new THREE.Group(); wrist.position.y = L2; elbow.add(wrist);
  wrist.add(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 16), mats.dark));
  wrist.add(box(0.62, 0.32, 0.52, mats.white, 0.3));
  const fL = box(0.1, 0.5, 0.36, mats.dark, 0.66);
  const fR = box(0.1, 0.5, 0.36, mats.dark, 0.66);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), mats.glow);
  eye.position.set(0, 0.3, 0.27);
  wrist.add(fL, fR, eye);

  return { root, yaw, shoulder, elbow, wrist, fL, fR };
}

function buildLabels(scene) {
  const font = new FontLoader().parse(fontJson);
  return ROBOT_LABELS.map((l) => {
    const geo = new TextGeometry(l.text, { font, size: 0.42, depth: 0.1, curveSegments: 4, bevelEnabled: false });
    geo.center();
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    const mat = new THREE.MeshStandardMaterial({ color: l.color, emissive: l.color, emissiveIntensity: 0.35, roughness: 0.4 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.castShadow = true;
    const group = new THREE.Group();
    group.position.set(l.pos[0], 0.08, l.pos[1]);
    group.add(mesh);
    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(bb.max.x - bb.min.x + 0.5, 0.5, bb.max.y - bb.min.y + 0.6),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    hit.userData.id = l.id;
    group.add(hit);
    scene.add(group);
    return { ...l, group, mesh, mat, hit, lift: 0, liftTarget: 0, hover: 0 };
  });
}

export function createRobotScene(host, { onStart, onPick, onHover }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const css = new CSS3DRenderer();
  css.domElement.className = 'rb-css3d';
  host.appendChild(css.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1d1d1b');
  scene.fog = new THREE.Fog('#1d1d1b', 16, 34);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 7;
  controls.maxDistance = 26;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.target.set(0, 1.4, 2);

  scene.add(new THREE.HemisphereLight('#ffffff', '#3a3a36', 1.1));
  const sun = new THREE.DirectionalLight('#ffffff', 2.2);
  sun.position.set(5, 11, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 });
  scene.add(sun);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: '#232321', roughness: 1 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  let grid = null;
  const hemi = scene.children.find((o) => o.isHemisphereLight);
  const setTheme = (name) => {
    const t = THEMES[name] || THEMES.dark;
    scene.background.set(t.bg);
    scene.fog.color.set(t.bg);
    floor.material.color.set(t.floor);
    hemi.intensity = t.hemi;
    if (grid) { scene.remove(grid); grid.geometry.dispose(); grid.material.dispose(); }
    grid = new THREE.GridHelper(14, 28, t.grid1, t.grid2);
    grid.position.set(0, 0.005, 1.5);
    scene.add(grid);
    labels?.forEach((l) => {
      const c = name === 'light' ? l.light : l.color;
      l.mat.color.set(c); l.mat.emissive.set(c);
    });
  };
  let labels = null;
  setTheme('dark');

  const mats = {
    white: new THREE.MeshStandardMaterial({ color: '#ecebe6', roughness: 0.32, metalness: 0.25 }),
    dark: new THREE.MeshStandardMaterial({ color: '#2b2b29', roughness: 0.5, metalness: 0.6 }),
    accent: new THREE.MeshStandardMaterial({ color: '#ff5b1f', emissive: '#ff5b1f', emissiveIntensity: 0.4 }),
    glow: new THREE.MeshBasicMaterial({ color: '#ff5b1f' }),
  };
  const arm = buildArm(mats);
  scene.add(arm.root);
  labels = buildLabels(scene);
  const hits = labels.map((l) => l.hit);

  const panelEl = document.createElement('div');
  panelEl.className = 'rb-panel';
  panelEl.dataset.testid = 'robot-3d-panel';
  const panel = new CSS3DObject(panelEl);
  panel.rotation.order = 'YXZ';
  panel.visible = false;
  scene.add(panel);
  const pv = { t: 0, target: 0, from: new THREE.Vector3(), to: new THREE.Vector3(), yaw: 0, scale: 0.0085 };

  const showPanel = (id) => {
    const l = labels.find((x) => x.id === id);
    const narrow = host.clientWidth / Math.max(1, host.clientHeight) < 0.8;
    panelEl.style.width = narrow ? '560px' : '900px';
    panelEl.style.height = narrow ? '860px' : '620px';
    pv.scale = narrow ? 0.0098 : 0.0088;
    pv.from.set(l.pos[0], 0.4, l.pos[1]);
    pv.to.set(narrow ? 0 : 0.2, narrow ? 4.2 : 2.9, narrow ? 2.6 : 2.2);
    pv.yaw = narrow ? FRONT_YAW_NARROW : FRONT_YAW;
    pv.target = 1;
    panel.visible = true;
  };
  const hidePanel = () => { pv.target = 0; };

  const pose = { ...IDLE };
  let target = { ...IDLE };
  let busy = false, picked = null, hovered = null, timers = [];

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickAt = (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(hits, false)[0]?.object.userData.id || null;
  };

  const pick = (id) => {
    if (busy) return;
    const l = labels.find((x) => x.id === id);
    if (!l || picked === l) return;
    if (picked) release();
    busy = true;
    hovered = null;
    onStart?.(id);
    const p = { x: l.pos[0], y: 0.08, z: l.pos[1] };
    target = { ...solveIK(p.x, p.z, p.y + GRIP + 0.55), grip: 0.26 };
    timers.push(setTimeout(() => { target = { ...solveIK(p.x, p.z, p.y + GRIP + 0.05), grip: 0.26 }; }, 900));
    timers.push(setTimeout(() => { target.grip = 0.1; }, 1350));
    timers.push(setTimeout(() => { l.liftTarget = 1; target = { ...solveIK(p.x, p.z, p.y + GRIP + 0.9), grip: 0.1 }; }, 1600));
    timers.push(setTimeout(() => { picked = l; busy = false; showPanel(id); onPick?.(id); }, 2150));
  };

  const release = () => {
    hidePanel();
    if (picked) picked.liftTarget = 0;
    picked = null;
    busy = false;
    target = { ...IDLE };
  };

  let downX = 0, downY = 0;
  const onDown = (e) => { downX = e.clientX; downY = e.clientY; };
  const onUp = (e) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return;
    const id = pickAt(e);
    if (id) pick(id);
  };
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const id = pickAt(e);
    if (id !== hovered) {
      hovered = id;
      renderer.domElement.style.cursor = id ? 'pointer' : 'grab';
      onHover?.(id);
    }
  };
  const el = renderer.domElement;
  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointermove', onMove);

  let wasNarrow = null;
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h);
    css.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const narrow = w / Math.max(1, h) < 0.8;
    if (narrow !== wasNarrow) {
      wasNarrow = narrow;
      camera.position.set(narrow ? 0.3 : 6.5, narrow ? 18 : 8.5, narrow ? 19.5 : 11);
      controls.target.set(0, narrow ? 0.8 : 1.4, 2);
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 4.5);
    const tg = !busy && !picked ? { ...IDLE, yaw: Math.sin(t * 0.35) * 0.5, wr: -0.6 + Math.sin(t * 0.8) * 0.15 } : target;
    for (const key of ['yaw', 'sh', 'el', 'wr', 'grip']) pose[key] += (tg[key] - pose[key]) * k;
    arm.yaw.rotation.y = pose.yaw;
    arm.shoulder.rotation.z = pose.sh;
    arm.elbow.rotation.z = pose.el;
    arm.wrist.rotation.z = pose.wr;
    arm.fL.position.x = -pose.grip;
    arm.fR.position.x = pose.grip;
    for (const l of labels) {
      l.lift += (l.liftTarget - l.lift) * k;
      l.hover += ((hovered === l.id ? 1 : 0) - l.hover) * k * 2;
      l.group.position.y = 0.08 + l.lift * 0.9 + l.hover * 0.12;
      l.mat.emissiveIntensity = 0.35 + l.hover * 0.6 + l.lift * 0.5;
      const s = 1 + l.hover * 0.08;
      l.group.scale.set(s, s, s);
    }
    pv.t += (pv.target - pv.t) * Math.min(1, k * 1.3);
    if (panel.visible) {
      const e = pv.t;
      panel.position.lerpVectors(pv.from, pv.to, e);
      panel.rotation.set(-Math.PI / 2 + e * (Math.PI / 2 - 0.5), pv.yaw * e, 0.2 * e);
      const sc = pv.scale * (0.12 + 0.88 * e);
      panel.scale.set(sc, sc, sc);
      if (pv.target === 0 && e < 0.02) panel.visible = false;
    }
    controls.update();
    renderer.render(scene, camera);
    css.render(scene, camera);
  });

  return {
    pick,
    release,
    showPanel,
    hidePanel,
    setTheme,
    panel: panelEl,
    dispose() {
      timers.forEach(clearTimeout);
      renderer.setAnimationLoop(null);
      ro.disconnect();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointermove', onMove);
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      renderer.dispose();
      el.remove();
      css.domElement.remove();
    },
  };
}
