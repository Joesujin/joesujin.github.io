document.addEventListener('DOMContentLoaded', () => {
    // Listen for clicks on elements with the 'video-reload' class
    document.body.addEventListener('click', (e) => {
        // Check if the clicked element or its parent is the reload button
        if (e.target.matches('.video-reload') || e.target.closest('.video-reload')) {
            console.log("Force reloading page...");
            // Force reload the page from the server (bypassing cache if possible)
            location.reload(true);
        }
    });
});
