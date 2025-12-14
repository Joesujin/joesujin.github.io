document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.game_card, .story-card, .other-card, .sketch-card');

    // Throttle function to improve scrolling performance
    let isScrolling = false;

    function highlightCenterCard() {
        const viewportCenter = window.innerHeight / 2;
        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + (rect.height / 2);
            const distance = Math.abs(viewportCenter - cardCenter);

            // Only consider cards that are actually getting close (e.g. within viewport)
            if (distance < minDistance && distance < (window.innerHeight / 2)) {
                minDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => {
            if (card === closestCard) {
                card.classList.add('mobile-active');
            } else {
                card.classList.remove('mobile-active');
            }
        });

        isScrolling = false;
    }

    // Use requestAnimationFrame for smooth performance
    window.addEventListener('scroll', () => {
        // Only run on mobile (width < 768px)
        if (window.innerWidth <= 768) {
            if (!isScrolling) {
                window.requestAnimationFrame(highlightCenterCard);
                isScrolling = true;
            }
        } else {
            // Cleanup if resized to desktop
            cards.forEach(card => card.classList.remove('mobile-active'));
        }
    }, { passive: true });

    // Initial check (only if mobile)
    if (window.innerWidth <= 768) {
        highlightCenterCard();
    }
});
