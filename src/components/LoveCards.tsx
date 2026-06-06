/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { LoveReason } from "../types";
import { Heart, Sparkles, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

export default function LoveCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const reasons: LoveReason[] = [
    {
      id: 1,
      reason: "لأنكِ حنونة تملئين روحي بالدفء والأمان 🤗",
      icon: "🌸",
      details: "حنانكِ يا رغد يحيط بقلبي كحضن دافئ في ليلة شاتية باردة. في كل مرة أشعر بالتعب، أجد في قلبك الحاني الملاذ الآمن والراحة التامة التي تنسيني كل مشاق وصخب ومتاعب الدنيا."
    },
    {
      id: 2,
      reason: "لأن قلبكِ طيب ونقي كقطرات الندى 🤍",
      icon: "💖",
      details: "تملكين قلباً طيباً يتسع للكون كله بنقائه وصفائه. طيبة قلبكِ تجعل كل من حولكِ يشعر بالسلام، وأنا أسعد الناس في هذا الوجود لأنني فزت بهذا القلب العظيم والجميل."
    },
    {
      id: 3,
      reason: "لأنكِ لطيفة في كل تفاصيلكِ وتعاملكِ 🌸",
      icon: "✨",
      details: "لطافتكِ لا مثيل لها، تنعكس في كلماتكِ العذبة، حركاتكِ الهادئة، وابتسامتكِ الساحرة التي تشرق مع كل صباح لتنير عوالمي وحياتي وتملأها أملاً وبهجة."
    },
    {
      id: 4,
      reason: "لأن عيونكِ الخضراء جميلة وتأسر قلبي 👀💚",
      icon: "👀",
      details: "عيناكِ الخضراوان هما أجمل لوحة طبيعية ملهمة رأتها عيني على الإطلاق. بحرٌ دافئ من السحر والجمال يغرقني في تفاصيله الأنيقة، أرى فيهما عهدنا ومستقبلنا وأماننا."
    },
    {
      id: 5,
      reason: "لأنكِ رقيقة كالحرير تلامسين وجداني 🌿",
      icon: "🌹",
      details: "رقتكِ تشبه نسيم الربيع خفةً وعذوبة. تلامسين روحي بهمسكِ الرقيق وحضوركِ الهادئ الأنيق، فأشعر معكِ في كل ثانية أنني أحلق عالياً في سماء السعادة اللامتناهية."
    },
    {
      id: 6,
      reason: "لأنكِ نازكة وراقية في كل حضور وحديث ✨",
      icon: "☀️",
      details: "كل تفصيلة فيكِ تنضح بالرقي والنعومة والسحر الخاص المميز. حضوركِ لافت بجماله الشاعري الهادئ وأسلوبكِ الفريد الذي يجعل قلبي يخفق بشدة فخراً وحباً بكِ."
    }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    // Add small delay to avoid showing flipped back text instantly during slide
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    }, 150);
  };

  const current = reasons[currentIndex];

  return (
    <div id="love-reasons-deck" className="relative text-right max-w-lg mx-auto py-12 px-4 select-none">
      
      {/* Decorative pulse glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-rose-500/5 blur-3xl rounded-full z-0 pointer-events-none"></div>

      {/* Title */}
      <div className="text-center mb-8 z-10 relative">
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          لماذا أحبكِ؟ 💕
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-2 font-light">
          انقري على البطاقة لتقليبها وقراءة التفاصيل الرومانسية الغامضة على ظهرها!
        </p>
      </div>

      {/* Main Double-Sided card framework */}
      <div className="perspective-1000 w-full h-[22rem] cursor-pointer group relative z-10 mb-8">
        
        {/* Revolving Inner Card Body */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-full transition-transform duration-700 ease-out preserve-3d shadow-2xl rounded-2xl ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl">
            
            {/* Ambient card design details */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 to-amber-400"></div>
            <div className="absolute -top-[100px] -right-[100px] w-48 h-48 bg-rose-600/5 rounded-full blur-2xl"></div>
            
            {/* Header info */}
            <div className="flex justify-between items-center w-full">
              <span className="text-pink-300 font-mono text-[10px] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                السبب {current.id} من {reasons.length}
              </span>
              <span className="text-2xl">{current.icon}</span>
            </div>

            {/* Core center message */}
            <div className="my-auto space-y-4">
              <div className="flex items-center justify-center">
                {/* Heart Beating Effect */}
                <div id="card-heart-beat" className="p-3 bg-white/5 rounded-full border border-white/10 animate-pulse relative">
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" style={{ animationDuration: "1.2s" }} />
                  <span className="absolute inset-0 rounded-full border-2 border-rose-500/30 animate-ping"></span>
                </div>
              </div>

              <h3 className="text-pink-100 text-lg md:text-xl font-bold font-serif leading-relaxed text-center px-2">
                "{current.reason}"
              </h3>
            </div>

            {/* Instruction tooltip */}
            <div className="flex justify-center items-center gap-1.5 text-pink-300/60 text-xs text-center border-t border-white/10 pt-4">
              <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "8s" }} />
              <span>انقري هنا لقلب البطاقة وقراءة التفاصيل</span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl backdrop-blur-xl">
            
            <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-rose-500 to-amber-400"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <span className="text-pink-200/70 font-serif text-[10px] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                تفاصيل مخلدة
              </span>
              <span className="text-amber-400 text-xs flex items-center gap-1">
                <span>روحي معكِ</span>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Content card body */}
            <div className="my-auto py-4">
              <p className="text-pink-100/90 text-sm md:text-base leading-relaxed font-serif font-light text-center">
                {current.details}
              </p>
            </div>

            {/* Foot note back wrapper */}
            <div className="text-center font-serif text-rose-300 text-[11px] border-t border-white/10 pt-4">
              من نبض قلبي إليكِ — آشور 💕
            </div>
          </div>

        </div>
      </div>

      {/* Stepping controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          className="bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow hover:shadow-rose-500/5 hover:text-white active:scale-95 focus:outline-none"
          title="السبب السابق"
        >
          <ChevronRight className="w-5 h-5 text-rose-400" />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-white/10 border border-white/20 text-pink-200 hover:text-white text-xs px-6 py-3 rounded-full font-bold transition flex items-center gap-1.5 shadow-md active:scale-95 focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? "اظهر الوجه" : "اظهر التفاصيل"}</span>
        </button>

        <button
          onClick={handleNext}
          className="bg-white/5 border border-white/10 hover:border-white/20 text-stone-300 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow hover:shadow-rose-500/5 hover:text-white active:scale-95 focus:outline-none"
          title="السبب التالي"
        >
          <ChevronLeft className="w-5 h-5 text-rose-400" />
        </button>
      </div>

    </div>
  );
}
