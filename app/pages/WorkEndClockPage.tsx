'use client';

import React, { useState, useEffect, useRef } from "react";
import { Clock, Settings } from "lucide-react";
import ClockPanel from "@/components/ClockPanel";
import MusicPlayer from "@/components/MusicPlayer";
import SettingsModal from "@/components/SettingsModal";


export default function WorkEndClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [endTime, setEndTime] = useState("17:30");
  const [showSettings, setShowSettings] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const [hour, minute] = endTime.split(":").map(Number);
      if (
        now.getHours() === hour &&
        now.getMinutes() === minute &&
        now.getSeconds() === 0 &&
        !celebrating
      ) {
        triggerCelebration();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime, celebrating]);

  const triggerCelebration = () => {
    setCelebrating(true);
    startFireworks();
    setTimeout(() => {
      setCelebrating(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }, 10000);
  };

  const startFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: any[] = [];
    const createFirework = (x: number, y: number) => {
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 100,
          color: `hsl(${Math.random() * 360},100%,60%)`,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;
        ctx.globalAlpha = p.life / 100;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);
      if (Math.random() < 0.05) {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${celebrating
        ? "bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900"
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
    >
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 ${celebrating ? "opacity-100" : "opacity-0"
          }`}
      />
      {celebrating && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md px-12 py-8 rounded-3xl animate-bounce">
            <h1 className="text-5xl font-bold text-white text-center">
              🎉 ยินดีด้วย! เลิกงานแล้ว 🎉
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Clock className={`w-8 h-8 ${celebrating ? "text-white" : "text-indigo-600"}`} />
            <h1
              className={`text-3xl font-bold ${celebrating ? "text-white" : "text-gray-800"
                }`}
            >
              นาฬิกาเลิกงาน
            </h1>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-full transition-all hover:scale-110 ${celebrating
              ? "bg-white/20 text-white hover:bg-white/30"
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
              }`}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ClockPanel currentTime={currentTime} endTime={endTime} celebrating={celebrating} />
          <MusicPlayer celebrating={celebrating} />
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          currentEndTime={endTime}
          onSave={(time) => setEndTime(time)}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
