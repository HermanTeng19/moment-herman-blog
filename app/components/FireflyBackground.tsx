'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  speed: number;
  angle: number;
  color: string;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (ctx: CanvasRenderingContext2D, mouse: { x: number | null; y: number | null; radius: number }, width: number, height: number) => void;
}

export default function FireflyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  // 确保组件只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || theme !== 'dark' || !mounted) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const particleCount = 80;
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150
    };

    // 粒子类
    class FireflyParticle implements Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      speed: number;
      angle: number;
      color: string;

      constructor(x?: number, y?: number) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * 360;
        this.color = `hsl(${Math.random() * 20 + 40}, 100%, 50%)`;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update(ctx: CanvasRenderingContext2D, mouse: { x: number | null; y: number | null; radius: number }, width: number, height: number) {
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;

          if (distance < mouse.radius) {
            this.x -= forceDirectionX * force * 3;
            this.y -= forceDirectionY * force * 3;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 20;
            }
            this.angle += 0.02;
            this.x += Math.cos(this.angle) * 0.2;
            this.y += Math.sin(this.angle) * 0.2;
          }
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.draw(ctx);
      }
    }

    // 事件监听器
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (event: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new FireflyParticle(event.x, event.y));
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // 添加事件监听器
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // 初始化粒子
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new FireflyParticle());
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(ctx, mouse, width, height);
      }
      if (particles.length > 200) {
        particles.splice(0, particles.length - 200);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    init();
    animate();

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, mounted]);

  // 只在客户端且深色模式下显示
  if (!mounted || theme !== 'dark') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
      }}
    />
  );
} 