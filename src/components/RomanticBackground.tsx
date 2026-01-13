import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'heart' | 'flower' | 'binary';
  color: string;
  rotation: number;
  rotationSpeed: number;
  binary?: string;
}

export default function RomanticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colors for binary rain - black and green theme
    const colors: string[] = [
      '#00ff00', // bright green
      '#00cc00', // medium green
      '#009900', // dark green
      '#00ff66', // light green
    ];

    // Initialize particles - increased count for more binary characters
    const particleCount = window.innerWidth < 700 ? 40 : 70;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const randomType = Math.random();
      let type: 'heart' | 'flower' | 'binary';
      
      if (randomType < 0.8) { // 80% chance of binary
        type = 'binary';
      } else if (randomType < 0.9) { // 10% chance of heart
        type = 'heart';
      } else { // 10% chance of flower
        type = 'flower';
      }
      
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 10, // Slightly larger size for better visibility
        speedX: (Math.random() - 0.5) * 0.2, // Reduced horizontal movement
        speedY: Math.random() * 0.5 + 0.3, // Increased vertical speed
        opacity: Math.random() * 0.6 + 0.4, // Increased opacity
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        binary: type === 'binary' ? (Math.random() > 0.5 ? '0' : '1') : undefined
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      const scale = size / 20;
      ctx.scale(scale, scale);
      
      // Draw simple outlined heart
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(-8, -12, -16, -8, -16, -2);
      ctx.bezierCurveTo(-16, 4, -8, 10, 0, 14);
      ctx.bezierCurveTo(8, 10, 16, 4, 16, -2);
      ctx.bezierCurveTo(16, -8, 8, -12, 0, -6);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawFlower = (x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      const scale = size / 20;
      ctx.scale(scale, scale);
      
      // Draw simple outlined flower petals
      const petalCount = 5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < petalCount; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / petalCount);
        ctx.beginPath();
        ctx.ellipse(0, -6, 3, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      
      // Draw flower center (small circle)
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawBinary = (x: number, y: number, size: number, color: string, opacity: number, binary: string) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `${size}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(binary, x, y);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        if (particle.type === 'heart') {
          drawHeart(particle.x, particle.y, particle.size, particle.color, particle.opacity, particle.rotation);
        } else if (particle.type === 'flower') {
          drawFlower(particle.x, particle.y, particle.size, particle.color, particle.opacity, particle.rotation);
        } else if (particle.type === 'binary' && particle.binary) {
          drawBinary(particle.x, particle.y, particle.size, particle.color, particle.opacity, particle.binary);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.8,
        backgroundColor: '#000000',
        pointerEvents: "none"
      }}
    />
  );
}