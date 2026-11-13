export default function SectionHead({ idx, path, title, id }) {
  return (
    <div className="sec-head rv" data-testid={`${id}-section-head`}>
      <span className="mono sec-path"><b>{idx}</b> — {path}</span>
      <h2 className="display sec-title">{title}</h2>
    </div>
  );
}
