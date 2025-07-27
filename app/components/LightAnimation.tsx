'use client';

import { useEffect, useRef } from 'react';

interface Bird {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  angle: number;
  flapSpeed: number;
  flapAngle: number;
  update: () => void;
  draw: () => void;
}

export default function LightAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const birdsRef = useRef<Bird[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({ x: null, y: null, radius: 150 });

  const colors = ['#ff7979', '#badc58', '#f9ca24', '#7ed6df', '#e056fd'];
  const birdCount = 25;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const birds = birdsRef.current;
    const mouse = mouseRef.current;

    class BirdClass {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      angle: number;
      flapSpeed: number;
      flapAngle: number;

      constructor(x?: number, y?: number) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.size = Math.random() * 15 + 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapSpeed = Math.random() * 0.2 + 0.1;
        this.flapAngle = 0;
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            this.x += dx / distance * 2;
            this.y += dy / distance * 2;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < -this.size || this.x > width + this.size) this.speedX *= -1;
        if (this.y < -this.size || this.y > height + this.size) this.speedY *= -1;

        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapAngle += this.flapSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const wingFlap = Math.sin(this.flapAngle) * (this.size / 4);

        ctx.beginPath();
        ctx.moveTo(0, 0); // Tail
        ctx.lineTo(-this.size, wingFlap); // Left wing tip
        ctx.lineTo(-this.size * 0.8, 0); // Body-wing joint
        ctx.lineTo(-this.size, -wingFlap); // Left wing tip (down)
        ctx.lineTo(0, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.lineTo(this.size * 0.3, 0); // Head
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.stroke();

        ctx.restore();
      }
    }

    function init() {
      birds.length = 0;
      for (let i = 0; i < birdCount; i++) {
        birds.push(new BirdClass());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const bird of birds) {
        bird.update();
        bird.draw();
      }
      if (birds.length > 50) {
        birds.splice(0, 1);
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e: MouseEvent) => {
      birds.push(new BirdClass(e.x, e.y));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(to bottom, #d0e1f9 0%, #f0f8ff 100%)'
      }}
    />
  );
} 