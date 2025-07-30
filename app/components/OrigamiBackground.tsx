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
  draw: (context: CanvasRenderingContext2D) => void;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

export default function OrigamiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdsRef = useRef<Bird[]>([]);
  const mouseRef = useRef<Mouse>({ x: null, y: null, radius: 150 });
  const animationRef = useRef<number | undefined>(undefined);

  // 根据主题调整颜色
  const getColors = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark 
      ? ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'] // 深色主题颜色
      : ['#ff7979', '#badc58', '#f9ca24', '#7ed6df', '#e056fd']; // 浅色主题颜色
  };

  const birdCount = 15; // 减少鸟的数量，避免影响页面性能

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

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
        this.size = Math.random() * 15 + 10;
        this.color = getColors()[Math.floor(Math.random() * getColors().length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapSpeed = Math.random() * 0.2 + 0.1;
        this.flapAngle = 0;
      }

      update() {
        const dx = this.x - (mouseRef.current.x || 0);
        const dy = this.y - (mouseRef.current.y || 0);
        const distance = Math.hypot(dx, dy);

        if (mouseRef.current.x && distance < mouseRef.current.radius) {
          this.x += dx / distance * 2;
          this.y += dy / distance * 2;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < -this.size || this.x > width + this.size) this.speedX *= -1;
        if (this.y < -this.size || this.y > height + this.size) this.speedY *= -1;

        this.angle = Math.atan2(this.speedY, this.speedX);
        this.flapAngle += this.flapSpeed;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        const wingFlap = Math.sin(this.flapAngle) * (this.size / 4);

        context.beginPath();
        context.moveTo(0, 0); // Tail
        context.lineTo(-this.size, wingFlap); // Left wing tip
        context.lineTo(-this.size * 0.8, 0); // Body-wing joint
        context.lineTo(-this.size, -wingFlap); // Left wing tip (down)
        context.lineTo(0, 0);
        context.fillStyle = this.color;
        context.fill();
        
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(-this.size * 0.6, 0);
        context.lineTo(this.size * 0.3, 0); // Head
        context.lineTo(-this.size * 0.6, 0);
        const isDark = document.documentElement.classList.contains('dark');
        context.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
        context.stroke();

        context.restore();
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
        bird.update();
        bird.draw(ctx);
      }
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

    // 初始化
    init();
    animate();

    // 事件监听
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);

    // 清理函数
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(to bottom, rgba(208, 225, 249, 0.3) 0%, rgba(240, 248, 255, 0.3) 100%)',
        filter: 'var(--bg-filter)'
      }}
    />
  );
} 