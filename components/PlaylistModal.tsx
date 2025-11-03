/* eslint-disable @typescript-eslint/no-explicit-any */
// PlaylistModal.tsx
import React from "react";
import { X } from "lucide-react";

interface PlaylistModalProps {
  results: any[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function PlaylistModal({
  results,
  currentIndex,
  onSelect,
  onClose,
}: PlaylistModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Playlist</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {results.length === 0 && (
            <p className="text-center text-gray-500 py-12">ไม่พบเพลง</p>
          )}

          {results.map((song, index) => (
            <button
              key={song.id || index}
              onClick={() => onSelect(index)}
              className={`w-full text-left p-3 mb-2 rounded-lg transition-all hover:scale-[1.02] ${currentIndex === index
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm">
                    {song.title || song.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {song.artist?.name || song.artist}
                  </p>
                </div>
                {currentIndex === index && (
                  <span className="text-xs font-medium">กำลังเล่น</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
