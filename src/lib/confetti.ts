import confetti from "canvas-confetti";

export function fireConfetti() {
  const duration = 2200;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    const particleCount = Math.floor(50 * (timeLeft / duration));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ["#E6E6FA", "#A2C2E1", "#ffffff"]
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ["#E6E6FA", "#A2C2E1", "#ffffff"]
    }));
  }, 250);
}