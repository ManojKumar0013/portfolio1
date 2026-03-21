/**
 * FINAL 3D PORTFOLIO LOGIC - CLEAN NAVIGATION VERSION
 * Features: 3D Flip, Quick-Nav jumping, Staggered Animations, & Theme Toggle
 * Blur Logic: Removed
 */

document.addEventListener("DOMContentLoaded", () => {
    const book = document.querySelector('.book');
    const pages = document.querySelectorAll('.book-page.page-right');
    const pageLeft = document.querySelector('.book-page.page-left');
    const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const contactMeBtn = document.querySelector('.btn.contact-me');
    const backProfileBtn = document.querySelector('.back-profile');
    const coverRight = document.querySelector('.cover.cover-right');
    const toggleBtn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    let totalPages = pages.length;
    let pageNumber = 0;

    // 1. HELPER: Set dynamic Z-Index stacking
    // Ensures pages on the left (flipped) stay above the profile and pages on the right stack correctly
    function updateZIndex() {
        pages.forEach((page, index) => {
            if (page.classList.contains('turn')) {
                page.style.zIndex = 100 + index;
            } else {
                page.style.zIndex = totalPages - index;
            }
        });
    }

    // 2. HELPER: Reverse index for staggered animation
    function reverseIndex() {
        pageNumber--;
        if (pageNumber < 0) {
            pageNumber = totalPages - 1;
        }
    }

    // 3. ARROW NAVIGATION
    // Handles manual flipping page by page
    pageTurnBtn.forEach((el) => {
        el.onclick = () => {
            const pageTurnId = el.getAttribute('data-page');
            const pageTurn = document.getElementById(pageTurnId);

            if (pageTurn.classList.contains('turn')) {
                pageTurn.classList.remove('turn');
            } else {
                pageTurn.classList.add('turn');
            }
            setTimeout(updateZIndex, 500);
        };
    });

    // 4. QUICK-NAV BUTTONS (Jumping to Specific Sections)
    function goToSpecificPage(targetNum) {
        // RESET all pages first to ensure clean state
        pages.forEach(p => p.classList.remove('turn'));

        if (targetNum == 1) { 
            // ABOUT: Show Front of Sheet 1 (Everything closed)
            // No extra 'turn' needed
        } 
        else if (targetNum == 2) { 
            // FOCUS: Show Back of Sheet 1 (Flip Sheet 1 only)
            pages[0].classList.add('turn');
        } 
        else if (targetNum == 3) { 
            // EDUCATION: Show Front of Sheet 2 (Flip Sheet 1, leave Sheet 2 closed)
            pages[0].classList.add('turn');
            pages[1].classList.remove('turn');
        } 
        else if (targetNum == 4) { 
            // SKILLS: Show Back of Sheet 2 (Flip both Sheet 1 and Sheet 2)
            pages[0].classList.add('turn');
            pages[1].classList.add('turn');
        }
        
        // Sync the stacking order after the flip starts
        setTimeout(updateZIndex, 500);
    }

    navButtons.forEach(btn => {
        btn.onclick = () => {
            const targetPageNum = btn.getAttribute('data-target-page');
            goToSpecificPage(targetPageNum);
        };
    });

    // 5. CONTACT ME & BACK TO PROFILE (Staggered batch flipping)
    if (contactMeBtn) {
        contactMeBtn.onclick = (e) => {
            e.preventDefault();
            pages.forEach((page, index) => {
                setTimeout(() => {
                    page.classList.add('turn');
                    setTimeout(updateZIndex, 500);
                }, (index + 1) * 200);
            });
        };
    }

    if (backProfileBtn) {
        backProfileBtn.onclick = (e) => {
            e.preventDefault();
            pageNumber = totalPages;
            pages.forEach((_, index) => {
                setTimeout(() => {
                    reverseIndex();
                    pages[pageNumber].classList.remove('turn');
                    setTimeout(updateZIndex, 500);
                }, (index + 1) * 200);
            });
        };
    }

    // 6. THEME TOGGLE
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                icon.className = "bx bx-sun";
            } else {
                icon.className = "bx bx-moon";
            }
        });
    }

    // 7. INITIAL OPENING ANIMATION
    updateZIndex(); 

    setTimeout(() => {
        if (coverRight) coverRight.classList.add('turn');
    }, 2100);

    setTimeout(() => {
        if (coverRight) coverRight.style.zIndex = -1;
    }, 2800);

    // Initial load reset: staggered sequence to close the book from a 'turn' state
    pageNumber = totalPages;
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');
            setTimeout(updateZIndex, 500);
        }, (index + 1) * 200 + 2100);
    });
});