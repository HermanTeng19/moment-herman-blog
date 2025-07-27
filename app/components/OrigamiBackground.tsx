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
  update: (mouse: { x: number | null; y: number | null; radius: number }, width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function OrigamiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const birdsRef = useRef<Bird[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colors = ['#ff7979', '#badc58', '#f9ca24', '#7ed6df', '#e056fd'];
    const birdCount = 12; // Reduced for better performance

    class BirdClass implements Bird {
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
        this.size = Math.random() * 12 + 8; // Slightly smaller
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 1.5 - 0.75; // Slower speed
        this.speedY = Math.random() * 1.5 - 0.75;
        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapSpeed = Math.random() * 0.15 + 0.08;
        this.flapAngle = 0;
      }

      update(mouse: { x: number | null; y: number | null; radius: number }, width: number, height: number) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            this.x += dx / distance * 1.5;
            this.y += dy / distance * 1.5;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < -this.size || this.x > width + this.size) this.speedX *= -1;
        if (this.y < -this.size || this.y > height + this.size) this.speedY *= -1;

        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapAngle += this.flapSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const wingFlap = Math.sin(this.flapAngle) * (this.size / 4);

        // Draw bird body
        ctx.beginPath();
        ctx.moveTo(0, 0); // Tail
        ctx.lineTo(-this.size, wingFlap); // Left wing tip
        ctx.lineTo(-this.size * 0.8, 0); // Body-wing joint
        ctx.lineTo(-this.size, -wingFlap); // Right wing tip
        ctx.lineTo(0, 0);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw bird outline
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.lineTo(this.size * 0.3, 0); // Head
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    const init = () => {
      birdsRef.current = [];
      for (let i = 0; i < birdCount; i++) {
        birdsRef.current.push(new BirdClass());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (const bird of birdsRef.current) {
        bird.update(mouseRef.current, width, height);
        bird.draw(ctx);
      }
      
      // Limit the number of birds
      if (birdsRef.current.length > 30) {
        birdsRef.current.splice(0, 1);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleClick = (e: MouseEvent) => {
      birdsRef.current.push(new BirdClass(e.x, e.y));
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);

    // Initialize and start animation
    init();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('click', handleClick);
    };
  }, []);

        return (
        <>
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20"
            style={{
              background: 'linear-gradient(to bottom, rgba(208, 225, 249, 0.05) 0%, rgba(240, 248, 255, 0.05) 100%)'
            }}
          />
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-stone-400 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            移动鼠标扰动鸟群 | 点击放飞新鸟
          </div>
        </>
      );
} 