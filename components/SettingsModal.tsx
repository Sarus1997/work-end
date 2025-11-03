import React, { useState } from "react";
import { X, Check } from "lucide-react";

interface SettingsModalProps {
  currentEndTime: string;
  onSave: (time: string) => void;
  onClose: () => void;
}

export default function SettingsModal({
  currentEndTime,
  onSave,
  onClose,
}: SettingsModalProps) {
  const [tempTime, setTempTime] = useState(currentEndTime);

  const handleSave = () => {
    onSave(tempTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">ตั้งเวลาเลิกงาน</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            เลือกเวลา
          </label>
          <input
            type="time"
            value={tempTime}
            onChange={(e) => setTempTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-lg font-mono"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Check className="w-5 h-5" /> บันทึก
        </button>
      </div>
    </div>
  );
}
