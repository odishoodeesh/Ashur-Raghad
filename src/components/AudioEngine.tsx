/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Heart } from "lucide-react";

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

// Poetic arabic lyrics dedicated to Raghad and Ashur
export const RAGHAD_ASHUR_LYRICS: LyricLine[] = [
  { time: 0, text: "💖 نغمة حب لقلبين نبضا معًا... آشور ورغد 💖" },
  { time: 4, text: "يا ضحكة عمرٍ غالي، يا بسمة قلبي العذبة..." },
  { time: 9, text: "عيناكِ يا رغد بحرٌ، تسبح فيه روحي المغتربة..." },
  { time: 14, text: "حين التقيتكِ أول مرة، أنار الكون كأن العيد قد حل..." },
  { time: 20, text: "وعدتِني بالودّ، وأوفيتِ بروحكِ التي كالعسل..." },
  { time: 26, text: "نحن معاً اليوم وغداً، وفي غدنا قصة للأبد تُروى..." },
  { time: 32, text: "حبٌ نقى كالثلج، وعشقٌ بالصدق والوفاء يقوى..." },
  { time: 38, text: "آشور يحب رغد، عهدٌ كتبه النبض بماء الذهب..." },
  { time: 44, text: "أنتِ ملاكي الراقي، شمس عمري ومبددة التعب..." },
  { time: 50, text: "كل عام ونحن معاً، تزداد دقات قلوبنا حباً وهيام..." },
  { time: 56, text: "كل عام وأنتِ بقلبي يا أميرتي، يا منتهى كل السلام..." }
];

interface AudioEngineProps {
  onAudioChange?: (isPlaying: boolean) => void;
  title?: string;
  // Shared global playing state and triggers
  isPlaying?: boolean;
  isMuted?: boolean;
  currentTime?: number;
  volume?: number;
  togglePlayback?: () => void;
  setVolume?: (v: number) => void;
  setIsMuted?: (m: boolean) => void;
}

export default function AudioEngine({
  onAudioChange,
  title = "لحن العشق الأبدي",
  isPlaying: propIsPlaying,
  isMuted: propIsMuted,
  currentTime: propCurrentTime,
  volume: propVolume,
  togglePlayback: propTogglePlayback,
  setVolume: propSetVolume,
  setIsMuted: propSetIsMuted,
}: AudioEngineProps) {
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [localIsMuted, setLocalIsMuted] = useState(false);
  const [localCurrentTime, setLocalCurrentTime] = useState(0);
  const [localVolume, setLocalVolume] = useState(0.5);

  const isPlaying = propIsPlaying !== undefined ? propIsPlaying : localIsPlaying;
  const isMuted = propIsMuted !== undefined ? propIsMuted : localIsMuted;
  const currentTime = propCurrentTime !== undefined ? propCurrentTime : localCurrentTime;
  const volume = propVolume !== undefined ? propVolume : localVolume;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentLineIndex = RAGHAD_ASHUR_LYRICS.reduce((acc, lyric, idx) => {
    if (currentTime >= lyric.time) return idx;
    return acc;
  }, 0);

  // Sync state with HTML5 Audio element (only used if not shared)
  useEffect(() => {
    if (audioRef.current && propTogglePlayback === undefined) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, propTogglePlayback]);

  const togglePlayback = () => {
    if (propTogglePlayback) {
      propTogglePlayback();
      return;
    }
    
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play prevented:", err);
      });
    }
  };

  const handlePlay = () => {
    setLocalIsPlaying(true);
    onAudioChange?.(true);
  };

  const handlePause = () => {
    setLocalIsPlaying(false);
    onAudioChange?.(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setLocalCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setLocalIsPlaying(false);
    onAudioChange?.(false);
    setLocalCurrentTime(0);
  };

  const isShared = propTogglePlayback !== undefined;

  const changeMuted = (muted: boolean) => {
    if (propSetIsMuted) {
      propSetIsMuted(muted);
    } else {
      setLocalIsMuted(muted);
    }
  };

  const changeVolume = (val: number) => {
    if (propSetVolume) {
      propSetVolume(val);
    } else {
      setLocalVolume(val);
    }
  };

  return (
    <div
      id="romantic-audio-player-widget"
      className="bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 p-5 max-w-sm mx-auto text-right text-white shadow-xl flex flex-col gap-4 relative overflow-hidden"
    >
      {!isShared && (
        <audio
          ref={audioRef}
          src="https://mp3tourl.com/audio/1780774758286-4e3143e3-5730-49f5-85f7-f24964978bdb.m4a"
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="auto"
        />
      )}

      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-500 via-pink-400 to-amber-500 opacity-20"></div>

      <div className="flex items-center justify-between gap-4">
        {/* Animated Visualizer Record */}
        <div id="revolving-record" className="relative flex items-center justify-center">
          <div
            className={`w-14 h-14 rounded-full border border-white/15 flex items-center justify-center bg-black/30 shadow-inner overflow-hidden transition-all duration-1000 ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "6s" }}
          >
            <div className="w-5 h-5 rounded-full bg-rose-600/80 flex items-center justify-center">
              <Heart className="w-2.5 h-2.5 text-white animate-pulse" />
            </div>
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}
        </div>

        {/* Melody Title */}
        <div className="text-right">
          <h4 className="font-semibold text-rose-300 text-sm tracking-tight font-serif">
            {title}
          </h4>
          <p className="text-pink-200/60 text-xs mt-0.5 flex items-center justify-end gap-1">
            <span>لحن أغنيتنا العذبة</span>
            <Music className="w-3.5 h-3.5 text-amber-300" />
          </p>
        </div>
      </div>

      {/* Floating Wave bar animation */}
      <div className="h-6 flex items-center justify-center gap-1">
        {Array.from({ length: 18 }).map((_, idx) => {
          const delay = idx * 0.1;
          return (
            <span
              key={idx}
              className="w-1 bg-gradient-to-t from-rose-400 to-pink-300 rounded-full transition-all duration-300 ease-in-out"
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 20) + 4}px` : "3px",
                animationName: isPlaying ? "bounce" : "none",
                animationDuration: "1.5s",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: isPlaying ? "infinite" : "0",
                animationDirection: "alternate",
                animationDelay: `${delay}s`,
              }}
            ></span>
          );
        })}
      </div>

      {/* Synchronized Poetic Arabic Lyrics */}
      <div className="bg-black/20 py-2.5 px-3 rounded-2xl border border-white/10 h-[4.5rem] flex items-center justify-center text-center overflow-hidden relative backdrop-blur-md">
        <p className="text-pink-100 text-sm font-sans tracking-tight font-medium leading-relaxed drop-shadow transition-all duration-500 animate-fade-in">
          {RAGHAD_ASHUR_LYRICS[currentLineIndex].text}
        </p>
      </div>

      {/* Play Controls & Volume sliders */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          {/* Volume state */}
          <button
            onClick={() => changeMuted(!isMuted)}
            className="text-pink-200/70 hover:text-white transition p-1.5 focus:outline-none"
            title="كتم الصوت"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              changeVolume(val);
              if (isMuted) changeMuted(false);
            }}
            className="w-16 h-1 bg-[#ffffff0a] bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
          />
        </div>

        <button
          onClick={togglePlayback}
          className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all transform active:scale-95 shadow-md focus:outline-none backdrop-blur-md"
        >
          <span>{isPlaying ? "إيقاف مؤقت" : "تشغيل أغنيتنا الجميلة 🎵"}</span>
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      <p className="text-[10px] text-pink-200/40 text-center font-mono tracking-tight mt-1">
        شغّلي الأغنية للاستماع المباشر المتزامن ✨
      </p>
    </div>
  );
}
