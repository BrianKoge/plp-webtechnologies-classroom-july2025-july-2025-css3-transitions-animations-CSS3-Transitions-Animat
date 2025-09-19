// Global state (demonstrates global scope)
let animationApplyCount = 0;

// Pure function: computes a duration string from a base and a multiplier (parameters + return value)
function computeDurationSeconds(baseSeconds, speedMultiplier) {
  const safeBase = Number(baseSeconds) || 1;
  const safeMultiplier = Number(speedMultiplier) || 1;
  const result = Math.max(0.1, safeBase / safeMultiplier);
  return `${result.toFixed(2)}s`;
}

// Function with side-effects: applies computed duration to an element style
function applyAnimationDuration(element, baseSeconds, speedMultiplier) {
  const duration = computeDurationSeconds(baseSeconds, speedMultiplier);
  element.style.animationDuration = duration;
  animationApplyCount += 1; // updates global state
  return duration; // also returns useful value
}

// Local scope demo: function-scoped variable is not accessible outside
function createClickCounter() {
  let count = 0; // local to closure
  return function increment() {
    count += 1;
    return count;
  };
}

// DOM ready
window.addEventListener('DOMContentLoaded', () => {
  const animatedBox = document.getElementById('animatedBox');
  const speedInput = document.getElementById('speed');
  const applyBtn = document.getElementById('applySpeed');
  const durationBadge = document.getElementById('computedDuration');
  const card = document.getElementById('card');
  const flipCardBtn = document.getElementById('flipCardBtn');
  const pulseBoxBtn = document.getElementById('pulseBoxBtn');
  const loader = document.getElementById('loader');
  const toggleLoaderBtn = document.getElementById('toggleLoaderBtn');

  // Initialize badge
  durationBadge.textContent = 'duration: 3.00s';

  // Closure counter demo
  const flipCount = createClickCounter();

  // Apply duration handler
  applyBtn.addEventListener('click', () => {
    const speed = Number(speedInput.value);
    const newDuration = applyAnimationDuration(animatedBox, 3, speed);
    durationBadge.textContent = `duration: ${newDuration}`;
    console.log(`[apply] animationApplyCount=${animationApplyCount}`);
  });

  // Flip card via class toggle
  flipCardBtn.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
    console.log(`[flip] count=${flipCount()}`);
  });

  // Pulse the box by toggling a class and forcing reflow for restart
  pulseBoxBtn.addEventListener('click', () => {
    animatedBox.classList.remove('pulse');
    // Force reflow to allow re-adding the class to restart the animation
    void animatedBox.offsetWidth; // eslint-disable-line no-unused-expressions
    animatedBox.classList.add('pulse');
  });

  // Start/stop loader
  let loaderActive = false;
  toggleLoaderBtn.addEventListener('click', () => {
    loaderActive = !loaderActive;
    loader.classList.toggle('is-active', loaderActive);
    loader.setAttribute('aria-hidden', String(!loaderActive));
    toggleLoaderBtn.textContent = loaderActive ? 'Stop Loader' : 'Start Loader';
  });
});


