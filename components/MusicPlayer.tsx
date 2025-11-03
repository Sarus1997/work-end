'use client';

import React, { useState, useRef, useEffect } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, List, Search } from "lucide-react";
import useDeezerSearch from "../hooks/useDeezerSearch";
import PlaylistModal from "./PlaylistModal";

export default function MusicPlayer({ celebrating }: { celebrating: boolean }) {
  const [query, setQuery] = useState("lofi");
  const { results } = useDeezerSearch(query);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Deezer preview 30s
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = results[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.preview) return;

    audio.pause();
    audio.load();
    if (isPlaying) audio.play().catch(() => { });

    const handleEnded = () => handleNext();
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 30);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSong, isPlaying]);

  const handleNext = () => setCurrentIndex((i) => (i + 1) % results.length);
  const handlePrev = () => setCurrentIndex((i) => (i - 1 + results.length) % results.length);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  // ฟังก์ชันช่วย format เวลาเป็น mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all duration-500 ${celebrating ? "bg-white/10 border border-white/20" : "bg-white/80 border border-white/50"
        }`}
    >
      {/* Search */}
      <div className="flex items-center mb-4 gap-2">
        <Search className={`w-5 h-5 ${celebrating ? "text-white" : "text-gray-600"}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาเพลง..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Music className={`w-6 h-6 ${celebrating ? "text-white" : "text-indigo-600"}`} />
          <h2 className={`text-xl font-bold ${celebrating ? "text-white" : "text-gray-800"}`}>
            เครื่องเล่นเพลง
          </h2>
        </div>
        <button
          onClick={() => setShowPlaylist(true)}
          className={`p-2 rounded-full transition-all hover:scale-110 ${celebrating ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
            }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {currentSong && (
        <>
          <div
            className={`text-center mb-6 p-6 rounded-2xl ${celebrating ? "bg-white/10" : "bg-gradient-to-br from-indigo-50 to-purple-50"
              }`}
          >
            <img
              src={currentSong.album.cover_medium}
              alt={currentSong.title}
              className="w-24 h-24 mx-auto rounded-full mb-4 shadow-lg"
            />
            <h3 className={`text-lg font-bold ${celebrating ? "text-white" : "text-gray-800"}`}>
              {currentSong.title}
            </h3>
            <p className={celebrating ? "text-white/70" : "text-gray-600"}>
              {currentSong.artist.name}
            </p>
          </div>

          <audio ref={audioRef} src={currentSong.preview} />

          {/* Progress bar with start & end time */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button onClick={handlePrev}>
              <SkipBack className={`w-6 h-6 ${celebrating ? "text-white" : "text-gray-600"}`} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:scale-110 transition"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button onClick={handleNext}>
              <SkipForward className={`w-6 h-6 ${celebrating ? "text-white" : "text-gray-600"}`} />
            </button>
          </div>
        </>
      )}

      {showPlaylist && (
        <PlaylistModal
          results={results}
          currentIndex={currentIndex}
          onSelect={(i) => {
            setCurrentIndex(i);
            setIsPlaying(true);
            setShowPlaylist(false);
          }}
          onClose={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
}
