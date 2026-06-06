/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Calendar, BookOpen, Music, Gift, Compass } from "lucide-react";
import LockScreen from "./components/LockScreen";
import BackgroundHearts from "./components/BackgroundHearts";
import StoryTimeline from "./components/StoryTimeline";
import LoveCards from "./components/LoveCards";
import MemoriesGallery from "./components/MemoriesGallery";
import PromisesList from "./components/PromisesList";
import LoveLetter from "./components/LoveLetter";
import GiftBox from "./components/GiftBox";
import RaghadJournal from "./components/RaghadJournal";
import AudioEngine from "./components/AudioEngine";
import { ThemeColor } from "./types";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeColor>("ruby");
  const [activeTab, setActiveTab] = useState<"story" | "hearts" | "music" | "gift">("story");

  // Global continuous audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayback = () => {
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
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  // Live Counter States from starting date June 11, 2024 00:00:00 (their anniversary mark)
  const [loveDuration, setLoveDuration] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target Lock Countdown June 11, 2026
  const targetDate = "2026-06-11T00:00:00";
  const startDate = "2025-11-11T00:00:00";

  // Calculate duration since love started
  useEffect(() => {
    if (!isUnlocked) return;

    const calculateLoveTime = () => {
      const diffMs = +new Date() - +new Date(startDate);
      if (diffMs <= 0) return;

      const msInSecond = 1000;
      const msInMinute = msInSecond * 60;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;
      const msInYear = msInDay * 365.25; // accounts for leap year

      const years = Math.floor(diffMs / msInYear);
      const remainingYearMs = diffMs % msInYear;

      const days = Math.floor(remainingYearMs / msInDay);
      const remainingDayMs = remainingYearMs % msInDay;

      const hours = Math.floor(remainingDayMs / msInHour);
      const remainingHourMs = remainingDayMs % msInHour;

      const minutes = Math.floor(remainingHourMs / msInMinute);
      const remainingMinuteMs = remainingHourMs % msInMinute;

      const seconds = Math.floor(remainingMinuteMs / msInSecond);

      setLoveDuration({ years, days, hours, minutes, seconds });
    };

    calculateLoveTime();
    const interval = setInterval(calculateLoveTime, 1000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  // Determine standard colors configuration based on selected luxurious theme
  const getThemeClasses = () => {
    switch (activeTheme) {
      case "rose":
        return {
          bg: "bg-[#0b050f] text-pink-100",
          bubbleLeft: "from-pink-900/30 to-rose-900/20",
          bubbleRight: "from-purple-900/25 to-pink-900/15",
          cardBg: "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl shadow-pink-950/20",
          textAccent: "text-pink-400",
          badgeBg: "from-pink-500/25 to-rose-500/20 text-pink-300 border border-white/10",
          buttonActive: "bg-white/15 border border-white/25 text-white shadow-lg backdrop-blur-md",
          glow: "shadow-pink-500/5",
          anniversaryBadge: "منذ بداية علاقتنا العبقة 🌸"
        };
      case "gold":
        return {
          bg: "bg-[#090703] text-amber-100",
          bubbleLeft: "from-amber-900/25 to-yellow-900/15",
          bubbleRight: "from-orange-950/30 to-amber-900/10",
          cardBg: "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl shadow-amber-950/20",
          textAccent: "text-amber-400",
          badgeBg: "from-amber-500/25 to-yellow-500/25 text-amber-300 border border-white/10",
          buttonActive: "bg-white/15 border border-white/25 text-amber-200 shadow-lg backdrop-blur-md",
          glow: "shadow-amber-500/5",
          anniversaryBadge: "مسيرة الذهب والعهود الشامخة 👑"
        };
      case "sapphire":
        return {
          bg: "bg-[#040612] text-indigo-100",
          bubbleLeft: "from-indigo-900/30 to-blue-900/20",
          bubbleRight: "from-slate-900/35 to-cyan-900/10",
          cardBg: "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl shadow-indigo-950/20",
          textAccent: "text-indigo-400",
          badgeBg: "from-indigo-500/25 to-blue-500/20 text-indigo-300 border border-white/10",
          buttonActive: "bg-white/15 border border-white/25 text-indigo-200 shadow-lg backdrop-blur-md",
          glow: "shadow-indigo-500/5",
          anniversaryBadge: "حب راسخ كالبحر وهامس كالنجوم 🌌"
        };
      default: // ruby
        return {
          bg: "bg-[#080204] text-rose-100",
          bubbleLeft: "from-rose-950/40 to-red-950/20",
          bubbleRight: "from-pink-950/30 to-purple-950/15",
          cardBg: "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl shadow-rose-950/20",
          textAccent: "text-rose-400",
          badgeBg: "from-rose-500/25 to-red-500/20 text-rose-300 border border-white/10",
          buttonActive: "bg-white/15 border border-white/25 text-rose-200 shadow-lg backdrop-blur-md",
          glow: "shadow-rose-500/5",
          anniversaryBadge: "حبنا الأبدي الشامخ كالعقيق ❤️"
        };
    }
  };

  const theme = getThemeClasses();

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0a0510] relative select-none">
        <audio
          key="global-romantic-audio"
          ref={audioRef}
          src="https://mp3tourl.com/audio/1780774758286-4e3143e3-5730-49f5-85f7-f24964978bdb.m4a"
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="auto"
        />
        <LockScreen
          targetDateTime={targetDate}
          onUnlock={() => setIsUnlocked(true)}
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTime={currentTime}
          volume={volume}
          togglePlayback={togglePlayback}
          setVolume={setVolume}
          setIsMuted={setIsMuted}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 font-sans pb-16 relative overflow-hidden select-none`}>
      <audio
        key="global-romantic-audio"
        ref={audioRef}
        src="https://mp3tourl.com/audio/1780774758286-4e3143e3-5730-49f5-85f7-f24964978bdb.m4a"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="auto"
      />
      {/* Decorative Background Elements (Frosted Glass Ambient Glow Spots) */}
      <div className={`absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-gradient-to-br ${theme.bubbleLeft} rounded-full blur-[130px] opacity-75 pointer-events-none`}></div>
      <div className={`absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-gradient-to-br ${theme.bubbleRight} rounded-full blur-[130px] opacity-65 pointer-events-none`}></div>
      <div className="absolute top-[35%] left-[25%] w-[400px] h-[400px] bg-pink-500/[0.03] rounded-full blur-[110px] pointer-events-none"></div>

      {/* Falling particles configuration based on theme accent */}
      <BackgroundHearts density={60} intensity="gentle" />

      {/* LUXURIOUS SUITE HEADER */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Theme Palette Switcher */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <span className="text-stone-400 text-[10px] uppercase font-mono tracking-wider select-none">رغد تختار اللون المفضّل:</span>
            <div id="palette-choices" className="flex items-center gap-2">
              <button
                onClick={() => setActiveTheme("ruby")}
                className={`w-6 h-6 rounded-full bg-rose-600 border-2 transition transform active:scale-90 ${
                  activeTheme === "ruby" ? "border-white scale-110 shadow-lg shadow-rose-600/30" : "border-stone-800"
                }`}
                title="العقيق الأحمر"
              ></button>
              <button
                onClick={() => setActiveTheme("rose")}
                className={`w-6 h-6 rounded-full bg-pink-400 border-2 transition transform active:scale-90 ${
                  activeTheme === "rose" ? "border-white scale-110 shadow-lg shadow-pink-400/30" : "border-stone-800"
                }`}
                title="الوردي الحريري"
              ></button>
              <button
                onClick={() => setActiveTheme("gold")}
                className={`w-6 h-6 rounded-full bg-amber-400 border-2 transition transform active:scale-90 ${
                  activeTheme === "gold" ? "border-white scale-110 shadow-lg shadow-amber-400/30" : "border-stone-800"
                }`}
                title="الدرجة الذهبية"
              ></button>
              <button
                onClick={() => setActiveTheme("sapphire")}
                className={`w-6 h-6 rounded-full bg-indigo-500 border-2 transition transform active:scale-90 ${
                  activeTheme === "sapphire" ? "border-white scale-110 shadow-lg shadow-indigo-500/30" : "border-stone-800"
                }`}
                title="الأزرق الملكي"
              ></button>
            </div>
          </div>

          {/* Animated Gold Glowing couples stamp */}
          <div className="flex items-center gap-2 order-1 sm:order-2 select-all text-right">
            <div className="relative">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-600 animate-pulse" />
              <span className="absolute inset-0 rounded-full border border-rose-500/45 animate-ping"></span>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
                آشور & رغد الأبدية 💕
              </h1>
            </div>
          </div>

        </div>
      </header>

      {/* MASTER SHOWBODY WRAPPER */}
      <main id="portal-body-layout" className="max-w-6xl mx-auto px-4 pt-8 md:pt-12 space-y-12">
        
        {/* LANDMARK CELEBRATION COMPONENT - THE "عداد الحب" */}
        <section
          id="love-milestone-clock"
          className={`${theme.cardBg} ${theme.glow} border p-6 md:p-8 rounded-3xl text-center backdrop-blur-md shadow-2xl relative overflow-hidden`}
        >
          {/* Subtle back watermark sparkles */}
          <div className="absolute -top-[120px] -left-[120px] w-64 h-64 bg-rose-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full text-[10px] text-stone-400">
            <span>تاريخ البداية: ١١ نوفمبر ٢٠٢٥</span>
            <Calendar className="w-3 h-3 text-amber-400" />
          </div>

          <span className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${theme.badgeBg} text-xs font-bold rounded-full mb-4`}>
            {theme.anniversaryBadge}
          </span>
          
          <h2 className={`text-2xl md:text-4xl font-serif font-extrabold ${theme.textAccent} drop-shadow mb-1`}>
            بوابة عشق آشور & رغد الخالدة ✨
          </h2>
          <p className="text-stone-300 text-xs md:text-sm max-w-lg mx-auto leading-relaxed mt-2 select-text">
            يتحرك هذا العداد لحظة بلحظة، ليحسب حجم نبضاتنا وأيامنا المليئة بالود والأمان والشراكة الأبدية
          </p>

          {/* Golden animated timeline counter block */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 max-w-2xl mx-auto select-all">
            {/* Years */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 font-bold font-mono">
                {loveDuration.years}
              </span>
              <span className="text-xs text-stone-400 mt-1">سنة</span>
            </div>
            {/* Days */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold font-mono">
                {loveDuration.days}
              </span>
              <span className="text-xs text-stone-400 mt-1">يوم</span>
            </div>
            {/* Hours */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold font-mono">
                {loveDuration.hours}
              </span>
              <span className="text-xs text-stone-400 mt-1">ساعة</span>
            </div>
            {/* Minutes */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 font-bold font-mono">
                {loveDuration.minutes}
              </span>
              <span className="text-xs text-stone-400 mt-1">دقيقة</span>
            </div>
            {/* Seconds */}
            <div className="flex flex-col items-center justify-center p-3 bg-black/40 rounded-2xl border border-rose-500/10 col-span-2 sm:col-span-1">
              <span className="text-3xl md:text-4xl text-rose-500 font-bold font-mono animate-pulse">
                {loveDuration.seconds}
              </span>
              <span className="text-xs text-rose-300 mt-1">ثانية حب ثانية</span>
            </div>
          </div>

          <div className="mt-8 select-none">
            <p className="text-[11px] text-[#cca050] font-bold tracking-widest uppercase flex items-center justify-center gap-1 mb-2 animate-pulse">
              <span>اليوم هو ذكرانا السنوية السعيدة يا رغد 💕</span>
            </p>
          </div>
        </section>

        {/* LUXURIOUS NAVIGATION MENU TAB BAR */}
        <section id="interface-navigation-tab-system" className="relative z-20">
          <div className="bg-stone-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-stone-800 shadow-xl max-w-3xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-1">
            {/* Tab 1: Story / Gallery */}
            <button
              onClick={() => setActiveTab("story")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none ${
                activeTab === "story" ? theme.buttonActive : "text-stone-400 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>قصتنا وألبومنا</span>
            </button>

            {/* Tab 2: Reasons / Promises */}
            <button
              onClick={() => setActiveTab("hearts")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none ${
                activeTab === "hearts" ? theme.buttonActive : "text-stone-400 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>لماذا أحبكِ ووعودي</span>
            </button>

            {/* Tab 3: Song / Letters */}
            <button
              onClick={() => setActiveTab("music")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none ${
                activeTab === "music" ? theme.buttonActive : "text-stone-400 hover:text-white"
              }`}
            >
              <Music className="w-4 h-4" />
              <span>أغنيتنا ورسالتي</span>
            </button>

            {/* Tab 4: Gift / Diary */}
            <button
              onClick={() => setActiveTab("gift")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 focus:outline-none ${
                activeTab === "gift" ? theme.buttonActive : "text-stone-400 hover:text-white"
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>الهدايا واليوميات</span>
            </button>
          </div>
        </section>

        {/* COMPONENT VIEWPOT INTERCHANGE */}
        <section id="portal-content-view" className="relative z-10 animate-fade-in duration-500">
          
          {/* TAB 1: STORY AND PHOTO GALLERY */}
          {activeTab === "story" && (
            <div className="space-y-12">
              <div id="story-timeline-card-group" className="bg-[#121212]/30 p-1 rounded-2xl">
                <StoryTimeline />
              </div>
              <div id="memories-gallery-card-group" className="bg-[#121212]/30 p-1 rounded-2xl border-t border-white/5 pt-8">
                <MemoriesGallery />
              </div>
            </div>
          )}

          {/* TAB 2: LOVE CARDS AND PROMISES */}
          {activeTab === "hearts" && (
            <div className="space-y-12">
              <div id="love-cards-deck-view" className="bg-[#121212]/30 p-1 rounded-2xl">
                <LoveCards />
              </div>
              <div id="promises-list-view" className="bg-[#121212]/30 p-1 rounded-2xl border-t border-white/5 pt-8">
                <PromisesList />
              </div>
            </div>
          )}

          {/* TAB 3: SONG LYRICS AND PERSONAL LETTER */}
          {activeTab === "music" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Synced lyrics and visualizer */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between text-right gap-4 h-full">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-xs font-bold rounded-full mb-3 text-pink-200 border border-white/10">
                    <Music className="w-3.5 h-3.5 text-rose-400" />
                    <span>أغنيتنا المفضلة المتزامنة 🔊</span>
                  </span>
                  <h3 className="text-xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500 mb-2">
                    نغمات الحب وكلمات الأغنية
                  </h3>
                  <p className="text-pink-100/70 text-xs leading-relaxed mb-6">
                    استمعي إلى لحن الحب العذب المُصاحب الذي صممته لكِ بالتزامن مع قراءة أبيات القصيدة المخصصة والناطقة بذكراكِ
                  </p>
                </div>
                <AudioEngine
                  title="أغنية آشور & رغد — ذكرى العشق 💕"
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  currentTime={currentTime}
                  volume={volume}
                  togglePlayback={togglePlayback}
                  setVolume={setVolume}
                  setIsMuted={setIsMuted}
                />
              </div>

              {/* Typed personal letter */}
              <div id="love-letter-ticker-view" className="bg-[#121212]/30 p-1 rounded-2xl">
                <LoveLetter />
              </div>
            </div>
          )}

          {/* TAB 4: MYSTERY GIFT AND JOURNAL RESPONSES */}
          {activeTab === "gift" && (
            <div className="space-y-12">
              <div id="golden-giftbox-reveal-view" className="bg-[#121212]/30 p-1 rounded-2xl">
                <GiftBox />
              </div>
              <div id="diary-journal-response-view" className="bg-[#121212]/30 p-1 rounded-2xl border-t border-white/5 pt-8">
                <RaghadJournal />
              </div>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER METADATA AND ELEGANT SEALS */}
      <footer className="mt-16 text-center text-stone-500 text-xs select-none max-w-md mx-auto space-y-2 px-6">
        <div className="flex items-center justify-center gap-1 text-rose-500/40">
          <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
          <span>عهد الوفاق بين آشور ورغد مستمر للأبد</span>
        </div>
        <p className="font-mono text-[10px]">
          Designed with pure love & perfection • Version 2.2.0 (June 2026)
        </p>
      </footer>
    </div>
  );
}
