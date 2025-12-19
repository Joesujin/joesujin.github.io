document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        // Convert NodeList to Array to safely use helper methods if needed, though forEach is fine
        const cards = Array.from(track.children);
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');

        // Center on the middle image initially if possible, or the first one
        let activeIndex = Math.floor(cards.length / 2);

        function updateCarousel() {
            // Calculate center position
            const wrapperCenter = wrapper.offsetWidth / 2;

            // Get active card width (assuming all are same or close enough, but let's measure active)
            const activeCard = cards[activeIndex];
            if (!activeCard) return;

            const cardWidth = activeCard.offsetWidth;
            const cardCenter = cardWidth / 2;

            // We want the center of the active card to align with the center of the wrapper
            // The track needs to shift so that the active card's left edge is at: wrapperCenter - cardCenter
            // But we need to account for all previous siblings' widths plus gap
            // Simpler approach: Calculate the distance from the left of the track to the center of the active card

            const trackRect = track.getBoundingClientRect(); // This moves, so maybe not reliable for absolute calc based on it
            // Better: loop through all cards before active and sum widths + gap
            // actually, let's just use the offsetLeft of the card relative to the track

            const cardLeft = activeCard.offsetLeft;
            const shift = wrapperCenter - cardCenter - cardLeft;

            track.style.transform = `translateX(${shift}px)`;

            // Update classes
            cards.forEach((card, index) => {
                if (index === activeIndex) {
                    card.classList.add('active');
                    card.classList.remove('inactive');
                } else {
                    card.classList.remove('active');
                    card.classList.add('inactive');
                }
            });
        }

        // Click handlers
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump if they are links
            activeIndex = (activeIndex + 1) % cards.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });

        // Initial setup
        // Delay slightly to ensure layout is computed
        setTimeout(updateCarousel, 100);
        window.addEventListener('resize', updateCarousel);
    });
});
