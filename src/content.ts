let isScrolling = true;
let scrollInterval: number | null = null;
let userInteracting = false;
let interactionTimeout: number | null = null;

function startScrolling() {
    if (!isScrolling || scrollInterval !== null) return;

    scrollInterval = window.setInterval(() => {
        window.scrollBy(0, 6);
    }, 1000 / 60); // 60 FPS
}

function stopScrolling() {
    if (scrollInterval !== null) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

function handleUserInteraction() {
    userInteracting = true;
    stopScrolling();

    resetInteractionTimeout();

    interactionTimeout = window.setTimeout(() => {
        userInteracting = false;
        startScrolling();
    }, 1000);
}

function resetInteractionTimeout() {
    if (interactionTimeout !== null) {
        clearTimeout(interactionTimeout);
    }
}


startScrolling();


document.addEventListener('mousemove', handleUserInteraction);
document.addEventListener('touchstart', handleUserInteraction);
document.addEventListener('touchend', handleUserInteraction);


window.addEventListener('focus', startScrolling);
