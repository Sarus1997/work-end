'use client';

import React, { useState, useEffect } from "react";

interface ClockPanelProps {
  endTime: string;
  celebrating: boolean;
}

export default function ClockPanel({ endTime, celebrating }: ClockPanelProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // อัปเดตเวลาทุกวินาทีบน client
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const calculateTimeLeft = () => {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const end = new Date(currentTime);
    end.setHours(endHour, endMinute, 0, 0);

    if (end < currentTime) {
      end.setDate(end.getDate() + 1);
    }

    const diff = end.getTime() - currentTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = calculateTimeLeft();

  return (
    <div
      className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500 ${celebrating ? "bg-white/10 border border-white/20" : "bg-white/80 border border-white/50"
        }`}
    >
      <div className="text-center mb-6">
        <p className={`${celebrating ? "text-white/80" : "text-gray-600"} text-sm mb-2`}>
          {formatDate(currentTime)}
        </p>
        <div
          className={`text-5xl font-bold mb-4 font-mono tracking-wider ${celebrating ? "text-white" : "text-gray-800"
            }`}
        >
          {formatTime(currentTime)}
        </div>
      </div>

      <div className={`border-t pt-6 ${celebrating ? "border-white/20" : "border-gray-200"}`}>
        <p className={`text-center text-sm mb-3 ${celebrating ? "text-white/80" : "text-gray-600"}`}>
          เวลาเลิกงาน: <span className="font-bold">{endTime}</span>
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div
            className={`text-center p-4 rounded-2xl ${celebrating ? "bg-white/10" : "bg-gradient-to-br from-pink-100 to-rose-100"
              }`}
          >
            <div className={`text-3xl font-bold mb-1 ${celebrating ? "text-white" : "text-rose-600"}`}>
              {hours}
            </div>
            <div className={`text-xs ${celebrating ? "text-white/70" : "text-gray-600"}`}>ชั่วโมง</div>
          </div>

          <div
            className={`text-center p-4 rounded-2xl ${celebrating ? "bg-white/10" : "bg-gradient-to-br from-purple-100 to-indigo-100"
              }`}
          >
            <div className={`text-3xl font-bold mb-1 ${celebrating ? "text-white" : "text-indigo-600"}`}>
              {minutes}
            </div>
            <div className={`text-xs ${celebrating ? "text-white/70" : "text-gray-600"}`}>นาที</div>
          </div>

          <div
            className={`text-center p-4 rounded-2xl ${celebrating ? "bg-white/10" : "bg-gradient-to-br from-blue-100 to-cyan-100"
              }`}
          >
            <div className={`text-3xl font-bold mb-1 ${celebrating ? "text-white" : "text-cyan-600"}`}>
              {seconds}
            </div>
            <div className={`text-xs ${celebrating ? "text-white/70" : "text-gray-600"}`}>วินาที</div>
          </div>
        </div>
      </div>
    </div>
  );
}
