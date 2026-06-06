/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from "react";
import { Lock, Heart, KeyRound, Sparkles, AlertCircle } from "lucide-react";
import AudioEngine from "./AudioEngine";
import BackgroundHearts from "./BackgroundHearts";
import { parseSafeDate } from "../types";

interface LockScreenProps {
  onUnlock: () => void;
  targetDateTime: string; // "2026-06-11T00:00:00"
  // Shared audio props
  isPlaying?: boolean;
  isMuted?: boolean;
  currentTime?: number;
  volume?: number;
  togglePlayback?: () => void;
  setVolume?: (v: number) => void;
  setIsMuted?: (m: boolean) => void;
}

export default function LockScreen({
  onUnlock,
  targetDateTime,
  isPlaying,
  isMuted,
  currentTime,
  volume,
  togglePlayback,
  setVolume,
  setIsMuted,
}: LockScreenProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  const [magicCodeInput, setMagicCodeInput] = useState("");
  const [showMagicBox, setShowMagicBox] = useState(false);
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +parseSafeDate(targetDateTime) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        // Automatically unlock when target time passes!
        onUnlock();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDateTime, onUnlock]);

  const handleMagicSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Allow standard entry with standard password or common words: e.g. "حبيبتي" / "11" / "love" / "عشق"
    const cleaned = magicCodeInput.trim().toLowerCase();
    if (cleaned === "رغد" || cleaned === "آشور" || cleaned === "11" || cleaned === "love" || cleaned === "preview") {
      onUnlock();
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2000);
    }
  };

  return (
    <div
      id="raghad-countdown-lockscreen"
      className="min-h-screen bg-[#0a0510] text-stone-100 flex flex-col justify-between p-6 relative overflow-hidden font-sans select-none"
    >
      {/* Decorative Background Elements (Frosted Glass Glow Spots) */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-red-900/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Falling Flowers/Hearts backdrop */}
      <BackgroundHearts density={50} intensity="gentle" />

      {/* Aesthetic upper details */}
      <div className="w-full flex justify-between items-center z-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-rose-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <Lock className="w-4 h-4 animate-pulse text-rose-500" />
          <span className="text-xs font-medium tracking-wide">الوصول مقيد حتى ١١ يونيو ٢٠٢٦</span>
        </div>
        
        {/* Magic key triggers preview bypass */}
        <button
          onClick={() => setShowMagicBox(!showMagicBox)}
          className="text-stone-400 hover:text-amber-300 transition-colors p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 backdrop-blur-md focus:outline-none"
          title="مفتاح العبور السري للمعينة"
        >
          <KeyRound className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center z-10 my-auto py-8">
        
        {/* Glowy Name Title */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 opacity-30 blur-2xl animate-pulse"></div>
          <h1 className="relative font-serif text-6xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 font-extrabold select-all drop-shadow-lg filter pt-2 pb-4">
            رغد
          </h1>
        </div>

        {/* Secret Message */}
        <p className="text-pink-100 text-lg md:text-2xl mt-4 font-serif font-light tracking-wide leading-relaxed drop-shadow">
          شيء جميل ينتظركِ يا رغد... ✨
        </p>
        <p className="text-pink-400 opacity-80 text-xs md:text-sm mt-2 tracking-wider">
          باقٍ من الزمن الكثير من الأشواق والنبضات المنتظرة
        </p>

        {/* Elegant Countdown Clock Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md my-10 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-black/30 rounded-2xl border border-white/5">
            <span className="text-3xl md:text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold drop-shadow">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-xs text-stone-300 font-medium mt-1 font-serif">أيام</span>
          </div>
          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-black/30 rounded-2xl border border-white/5">
            <span className="text-3xl md:text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold drop-shadow">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs text-stone-300 font-medium mt-1 font-serif">ساعات</span>
          </div>
          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-black/30 rounded-2xl border border-white/5">
            <span className="text-3xl md:text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold drop-shadow">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs text-stone-300 font-medium mt-1 font-serif">دقائق</span>
          </div>
          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-[#ff4d6d]/10 rounded-2xl border border-[#ff4d6d]/20">
            <span className="text-3xl md:text-5xl font-mono text-rose-400 font-bold drop-shadow animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs text-rose-300 font-medium mt-1 font-serif">ثواني</span>
          </div>
        </div>

        {/* Music Widget for Cozy Vibe */}
        <div className="w-full max-w-sm mt-4">
          <AudioEngine
            title="قبل الفتح — موسيقى الآمال الدافئة 🌸"
            isPlaying={isPlaying}
            isMuted={isMuted}
            currentTime={currentTime}
            volume={volume}
            togglePlayback={togglePlayback}
            setVolume={setVolume}
            setIsMuted={setIsMuted}
          />
        </div>

        {/* Magic Code Form overlay */}
        {showMagicBox && (
          <div className="w-full max-w-sm bg-black/40 border border-white/10 rounded-3xl p-5 mt-6 backdrop-blur-2xl shadow-2xl animate-fade-in text-right">
            <h3 className="text-xs text-pink-300 tracking-wider font-semibold uppercase flex items-center justify-end gap-1 mb-2">
              <span>تجاوز عدّاد الانتظار للمعاينة المباشرة</span>
              <Sparkles className="w-4 h-4" />
            </h3>
            <p className="text-[11px] text-pink-100/70 leading-relaxed mb-4 font-sans">
              يمكنك كتابة "رغد" أو "آشور" أو "11" لفتح البوابة واختبار كافة الميزات الرائعة فوراً دون انتظار ١١ يونيو!
            </p>
            <form onSubmit={handleMagicSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب كلمة العبور السحرية هنا..."
                value={magicCodeInput}
                onChange={(e) => setMagicCodeInput(e.target.value)}
                className="bg-black/40 border border-white/15 focus:border-pink-400 rounded-xl px-3 py-2 text-xs w-full text-center outline-none transition text-white"
                dir="rtl"
              />
              <button
                type="submit"
                className="bg-gradient-to-l from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs px-4 py-2 font-semibold rounded-xl shrink-0 transition shadow-lg active:scale-95"
              >
                فتح المعاينة
              </button>
            </form>
            {codeError && (
              <div className="text-rose-400 text-[10px] mt-2 flex items-center justify-end gap-1">
                <span>الكلمة الخاطئة! جرب كتابة "رغد" أو "11"</span>
                <AlertCircle className="w-3 h-3" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footnote card details */}
      <div className="w-full max-w-lg mx-auto text-center z-10 text-pink-200/40 text-[11px] font-mono select-none tracking-wider mt-4">
        <span>© آشور & رغد الأبدية · تصميم صُمم بشغف وحب لا ينتهي • 2026</span>
      </div>
    </div>
  );
}
