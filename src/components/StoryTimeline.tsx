/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Milestone } from "../types";
import { Heart, MapPin, Gift, Star, Calendar, MessageCircle, ChevronLeft } from "lucide-react";

export default function StoryTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const milestones: Milestone[] = [
    {
      id: 1,
      date: "١١ نوفمبر ٢٠٢٥",
      title: "شرارة البداية — اللقاء الأول ☕",
      description: "اليوم الذي غيّر طعم وعمري بالكامل. حين التقت عيناي بعينيكِ الخضراوين الدافئتين لأول مرة معلنتين بداية قصة حبنا الأعظم، وعرفتُ فوراً أن كل ما عشته قبلك كان تمهيداً لتلك اللحظة.",
      icon: "start",
      accent: "from-rose-500 to-pink-500"
    },
    {
      id: 2,
      date: "٢٥ ديسمبر ٢٠٢٥",
      title: "كلمة الحب الأولى — دقات متسارعة 💕",
      description: "حين تلاشت الكلمات وخفق القلب بحبكِ معلناً التزام قلبينا برحلة العشق الأبدي الشامخ. همستُ بها وعيناك تجيبان بوعود صادقة تملأ روحي بالسكينة.",
      icon: "love",
      accent: "from-rose-600 to-amber-500"
    },
    {
      id: 3,
      date: "١٤ فبراير ٢٠٢٦",
      title: "أول عيد حب معاً — عهود الورد 🌹",
      description: "أول عيد حب يجمعنا كنبض واحد تحت مسمى الحب الحلال الطاهر، احتفلنا بعهدنا وتبادلنا وعود الرعاية الصادقة والود والوفاء الذي لن تبدده المسافات.",
      icon: "gift",
      accent: "from-amber-400 to-rose-400"
    },
    {
      id: 4,
      date: "٥ مايو ٢٠٢٦",
      title: "رحلتنا المشتركة — نسيم الأيام 🌄",
      description: "رحلة دافئة نسجنا فيها تفاصيل صغيرة مذهلة، ضحكتكِ الصافية واهتمامكِ الطفولي ورقة حضورك كانت تملأ قلبي بالبهجة والأمان في كل طريق نخوضه معاً.",
      icon: "trip",
      accent: "from-emerald-500 to-teal-500"
    },
    {
      id: 5,
      date: "١١ يونيو ٢٠٢٦",
      title: "يوم زواجنا المنتظر — البداية الأبدية 💍",
      description: "التاريخ الذهبي والعد التنازلي الأعظم الذي نتطلع إليه بشغف، حيث يكتمل شملنا المبارك محفوفين بعهد الزواج السعيد وتبدأ حياتنا الأسرية الدافئة والمستقرة.",
      icon: "promise",
      accent: "from-violet-500 to-fuchsia-500"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "start":
        return <Star className="w-5 h-5 text-amber-400" />;
      case "love":
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      case "trip":
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case "gift":
        return <Gift className="w-5 h-5 text-amber-500" />;
      default:
        return <Calendar className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <div id="story-timeline-section" className="relative text-right max-w-3xl mx-auto py-10 px-4">
      
      {/* Dynamic Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/10 mb-3">
          <Heart className="w-3 h-3 text-rose-500" />
          <span>ذكرى مسيرتنا الغالية</span>
        </span>
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          قصتنا — خطنا الزمني الأبدي 📖
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed">
          نسترجع معاً أجمل الذكريات والمحطات التاريخية التي شهدت على نمو حبنا خطوة بخطوة
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Continuous center vertical path */}
        <div className="absolute right-6 md:right-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500 via-amber-400 to-stone-800 transform md:translate-x-1/2"></div>

        <div className="space-y-12">
          {milestones.map((m, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={m.id}
                className={`flex flex-col md:flex-row relative items-start md:items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Connector Node */}
                <div className="absolute right-3 md:right-1/2 w-7 h-7 rounded-full bg-black border-2 border-white/35 flex items-center justify-center z-10 transform translate-x-1/2 shadow-lg shadow-white/5">
                  {getIcon(m.icon)}
                </div>

                {/* Date Side label */}
                <div className="mr-14 md:mr-0 md:w-1/2 px-4 text-rose-300 text-sm font-bold font-serif mb-2 md:mb-0 md:text-center">
                  <span className="inline-block bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow">
                    {m.date}
                  </span>
                </div>

                {/* Milestone Detail Card */}
                <div className="mr-14 md:mr-0 md:w-1/2 px-4 w-full">
                  <div
                    onClick={() => setSelectedMilestone(m)}
                    className="bg-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer rounded-3xl border border-white/10 p-5 md:p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl backdrop-blur-md group text-right"
                  >
                    {/* Visual Card art background preset */}
                    <div className={`h-28 w-full rounded-2xl bg-gradient-to-br ${m.accent} mb-4 relative overflow-hidden flex items-end justify-between p-4 shadow-inner opacity-80 group-hover:opacity-100 transition`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full border border-white/10">
                        ذكرى مخلدة ✨
                      </div>
                      <Heart className="w-12 h-12 text-white/10 absolute bottom-1 left-2 transform -rotate-12" />
                      
                      <div className="z-10 text-right">
                        <span className="text-[11px] text-white/80 font-mono tracking-wider">{m.date}</span>
                        <h4 className="text-white text-base font-bold text-shadow leading-tight mt-0.5 block">{m.title}</h4>
                      </div>
                    </div>

                    <p className="text-pink-100/70 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {m.description}
                    </p>

                    <div className="flex justify-end items-center gap-1 text-xs text-amber-300 mt-4 font-semibold group-hover:text-amber-200 transition">
                      <span>اقرأ القصة الكاملة</span>
                      <ChevronLeft className="w-4 h-4 transition transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal for detailed milestone readout */}
      {selectedMilestone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in text-white text-right">
          <div className="bg-black/40 border border-white/10 max-w-md w-full rounded-[32px] overflow-hidden shadow-2xl relative backdrop-blur-2xl">
            
            {/* Modal Image Background */}
            <div className={`h-48 bg-gradient-to-br ${selectedMilestone.accent} p-6 flex flex-col justify-between relative`}>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 left-4 bg-black/55 rounded-full text-white hover:bg-black/80 transition p-1.5 focus:outline-none border border-white/10"
              >
                ✕
              </button>
              <div className="absolute top-4 right-4 bg-black/40 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/15">
                {selectedMilestone.date}
              </div>
              <div></div>
              <div className="relative z-10">
                <span className="text-white/80 text-[10px] uppercase font-mono tracking-widest bg-black/40 px-2.5 py-0.5 rounded-full inline-block border border-white/10">قصة حبنا</span>
                <h3 className="text-xl font-bold mt-1.5 text-white">{selectedMilestone.title}</h3>
              </div>
            </div>

            {/* Readout contents */}
            <div className="p-6 md:p-8 space-y-4">
              <p className="text-pink-100/90 text-sm md:text-base leading-relaxed font-serif">
                {selectedMilestone.description}
              </p>

              <div id="love-signature-stamp" className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                <span className="text-xs text-pink-200/50">كتبه لكِ المحب، آشور</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="w-full bg-gradient-to-r from-rose-500 to-amber-500 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 active:scale-[98%] transition mt-4"
              >
                إغلاق الذكرى 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
