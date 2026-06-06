/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, MouseEvent } from "react";
import { Memory } from "../types";
import { Heart, ZoomIn, Calendar, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function MemoriesGallery() {
  const [activeMemoryIdx, setActiveMemoryIdx] = useState<number | null>(null);

  // Curated elegant romantic images representing their memories
  const memories: Memory[] = [
    {
      id: 1,
      title: "غروب الشاطئ الدافئ 🌊",
      caption: "حين كتبنا اسمينا على رمال البحر المتلألئة وتعهدنا أمام الأمواج الصافية أن يظل حبنا قوياً كالصخور.",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
      date: "١٢ يوليو ٢٠٢٤",
    },
    {
      id: 2,
      title: "أضواء المدينة الخافتة 🌃",
      caption: "العشاء الهادئ الذي قضيناه نتهامس ونحدق بالنجوم، نسينا البرد والضجيج ولم نرى سوى عيني بعضنا.",
      imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=600",
      date: "٢٥ ديسمبر ٢٠٢٤",
    },
    {
      id: 3,
      title: "فنجان القهوة المشترك ☕",
      caption: "صباحات دافئة مليئة بنظرات خاشعة، حيث رائحة قهوتك تعادل كل السعادة والطمأنينة التي بحثت عنها طويلاً.",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
      date: "١٠ مارس ٢٠٢٥",
    },
    {
      id: 4,
      title: "نزهة الورد والربيع 🌸",
      caption: "حين زرعنا الشتلة الصغيرة ووعدتني برعايتها كما نرعى بذور حبنا المتفرع بقلوبنا النقية الشغوفة.",
      imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=600",
      date: "١٨ أبريل ٢٠٢٥",
    }
  ];

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeMemoryIdx === null) return;
    setActiveMemoryIdx((activeMemoryIdx + 1) % memories.length);
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeMemoryIdx === null) return;
    setActiveMemoryIdx((activeMemoryIdx - 1 + memories.length) % memories.length);
  };

  return (
    <div id="memories-gallery-section" className="relative text-right max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          ذكرياتنا المخلدة 🖼️
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 font-light max-w-md mx-auto">
          ألبوم الصور الرومانسي يجسد أهم محطات الود التي جمعتنا معاً بإطارات بولارويد ريفية خلابة
        </p>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map((m, idx) => {
          // Subtle rotate alternate for playful rustic real polaroid feeling
          const rotationClass = idx % 2 === 0 ? "rotate-2 hover:rotate-0" : "-rotate-2 hover:rotate-0";
          return (
            <div
              key={m.id}
              onClick={() => setActiveMemoryIdx(idx)}
              className={`bg-white/5 border border-white/10 p-4 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer max-w-xs mx-auto w-full flex flex-col justify-between ${rotationClass} backdrop-blur-xl group hover:border-white/20`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
                <img
                  src={m.imageUrl}
                  alt={m.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black transition border border-white/10">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Polaroid handwritten border */}
              <div className="pt-4 pb-1 text-right">
                <div className="flex items-center justify-between text-[11px] text-pink-300/60 font-mono mb-1">
                  <span className="flex items-center gap-1">
                    <span>{m.date}</span>
                    <Calendar className="w-3 h-3 text-rose-400" />
                  </span>
                  <span className="text-pink-100 text-xs font-semibold">{m.title}</span>
                </div>
                <p className="text-pink-100/70 font-serif text-[11px] leading-relaxed mt-1 line-clamp-2">
                  {m.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Overlay for zoom modal */}
      {activeMemoryIdx !== null && (
        <div
          onClick={() => setActiveMemoryIdx(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in text-white text-right"
        >
          {/* Close button top left */}
          <button
            onClick={() => setActiveMemoryIdx(null)}
            className="absolute top-4 left-4 bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 p-2 rounded-full focus:outline-none border border-white/15 transition z-50"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black/40 border border-white/10 rounded-[32px] p-4 md:p-6 max-w-2xl w-full mx-auto shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col"
          >
            {/* Swipping navigation overlays */}
            <button
              onClick={handlePrev}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border border-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition focus:outline-none z-10"
              title="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border border-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition focus:outline-none z-10"
              title="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Core Full Size Image */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-inner">
              <img
                src={memories[activeMemoryIdx].imageUrl}
                alt={memories[activeMemoryIdx].title}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-amber-300 border border-white/10">
                <span>{memories[activeMemoryIdx].date}</span>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              </div>
            </div>

            {/* Title / Description */}
            <div className="pt-6 px-2 space-y-2">
              <div className="flex items-center justify-end gap-1.5 text-amber-300 text-sm font-semibold">
                <span>{memories[activeMemoryIdx].title}</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-pink-100/90 text-xs md:text-sm leading-relaxed font-serif pb-4">
                {memories[activeMemoryIdx].caption}
              </p>
              <div className="text-[10px] text-pink-200/40 text-center border-t border-white/10 pt-3">
                صورة {activeMemoryIdx + 1} من {memories.length} • انقري في أي مكان خارج البطاقة للخروج
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
