/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Sparkles, Gift, Heart, Eye } from "lucide-react";

interface Voucher {
  id: number;
  title: string;
  badge: string;
  description: string;
  icon: string;
  code: string;
}

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedVoucher, setRevealedVoucher] = useState<Voucher | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);
  const nextConfettiId = useRef(0);

  const vouchers: Voucher[] = [
    {
      id: 1,
      title: "🎫 قسيمة عشاء ملكي تحت ضوء النجوم 🕯️",
      badge: "صالحة للأبد",
      description: "تمنحكِ هذه القسيمة الحق الكامل بمطالبة آشور بسهرة عشاء ملكية فاخرة في أي مكان تفضلينه، على طاولة تزينها الشموع والورود ومعزوفة موسيقية مخصصة لكِ وحدكِ.",
      icon: "🕯️",
      code: "RAGHAD-ROYAL-DINNER-2026"
    },
    {
      id: 2,
      title: "✈️ تذكرة الهروب الأبدي والسفر المشترك 🌍",
      badge: "رحلة الحلم",
      description: "رحلة كاملة نخطط لها معاً إلى مدينة أحلامكِ التي تتوقين لزيارتها. يسهر آشور على توفير كافة تفاصيل الراحة والدلال والضحكات المتبادلة لننسج معاً ذكرياتٍ تخلد في ذاكرة الزمن.",
      icon: "🌍",
      code: "ASHUR-RAGHAD-WANDERLUST"
    },
    {
      id: 3,
      title: "🧸 وعد الأمان والاحتضان الدافئ الشافي 🤗",
      badge: "دواء الروح",
      description: "صالحة للاستخدام في أي وقت تشعرين فيه بالبرد أو التعب أو الرغبة في الاختباء من العالم. تمنحكِ احتضاناً دافئاً طويلاً يتلاشى معه أي حزن وتبتسم معه ثنايا روحكِ مجدداً.",
      icon: "🤗",
      code: "PREMIUM-COZY-HUG-UNLIMITED"
    }
  ];

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Pick a random sweet romantic voucher for Raghad!
    const randomVoucher = vouchers[Math.floor(Math.random() * vouchers.length)];
    setRevealedVoucher(randomVoucher);

    // Blast micro-hearts confetti!
    const list = [];
    const colors = ["#ff003c", "#f000ff", "#ffbf00", "#ff007b", "#ffdd00"];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: nextConfettiId.current++,
        x: Math.random() * 200 - 100, // random distance from center
        y: Math.random() * -120 - 40,  // shoot upwards
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
      });
    }
    setConfetti(list);
  };

  const handleReset = () => {
    setIsOpen(false);
    setRevealedVoucher(null);
    setConfetti([]);
  };

  return (
    <div id="hidden-giftbox-widget" className="relative text-right max-w-md mx-auto py-12 px-4 select-none">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          🎁 هديتكِ ومفاجأتي المخفية
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 font-light">
          انقري على الصندوق الذهبي أدناه لتفجير القلوب وفك القفل عن قسيمة ورقية سحرية مخصصة لكِ!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[300px] relative">
        
        {/* Closed box view */}
        {!isOpen ? (
          <div
            onClick={handleOpenBox}
            className="group relative cursor-pointer flex flex-col items-center justify-center p-8 transition transform hover:scale-105 active:scale-95 duration-300"
          >
            {/* Pulsing Back Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-1000 animate-pulse"></div>

            {/* Gift Box Graphics using CSS vectors for robust looks */}
            <div className="relative w-40 h-40 animate-bounce" style={{ animationDuration: "2.5s" }}>
              
              {/* Lid */}
              <div className="absolute top-0 left-0 w-40 h-10 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg shadow-md border border-rose-400/20 z-20 flex items-center justify-center">
                {/* Gold Ribbon Knot */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full border border-amber-300/40 shadow-md"></div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
              </div>

              {/* Main Box Body */}
              <div className="absolute bottom-0 left-2 w-36 h-32 bg-gradient-to-br from-rose-600 to-rose-850 rounded-b-xl border border-rose-500/10 shadow-2xl z-10">
                {/* Golden Ribbon Strips */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-amber-300 to-amber-500 shadow-inner"></div>
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-b from-amber-300 to-amber-500 shadow-inner"></div>

                {/* Sparkling dots on box */}
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/20"></div>
                <div className="absolute bottom-5 right-6 w-1.5 h-1.5 rounded-full bg-white/30"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-amber-400/30 animate-ping"></div>
              </div>

            </div>

            <div className="mt-4 text-center z-10">
              <span className="text-[10px] text-amber-400 uppercase font-mono tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/10 inline-block font-semibold">
                افتحي هديتكِ الآن 🌟
              </span>
              <p className="text-stone-300 text-xs mt-1.5">
                تضم هدايا معنوية ورومانسية لا نهائية
              </p>
            </div>
          </div>
        ) : (
          /* Opened display showing gift Voucher */
          <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl animate-fade-in text-white text-right">
            
            {/* Visual Confetti Micro Hearts flying */}
            <div className="absolute inset-x-0 top-0 pointer-events-none h-40 overflow-hidden">
              {confetti.map((c) => (
                <div
                  key={c.id}
                  className="absolute animate-pulse"
                  style={{
                    left: `calc(50% + ${c.x}px)`,
                    top: `100px`,
                    transform: `translateY(${c.y}px)`,
                    color: c.color,
                    fontSize: `${c.size}px`,
                    transition: "all 1s ease-out",
                    opacity: 0.9,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-amber-400 via-rose-500 to-amber-400"></div>

            <div className="flex justify-between items-center w-full mb-6 relative z-10">
              <button
                onClick={handleReset}
                className="bg-white/5 text-stone-300 hover:text-white border border-white/10 hover:bg-white/10 font-bold text-xs px-3.5 py-1.5 rounded-xl focus:outline-none transition"
              >
                المحاولة مجدداً 🔄
              </button>
              <span className="text-[10px] text-emerald-300 font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                {revealedVoucher?.badge}
              </span>
            </div>

            {/* Revealed voucher contents */}
            {revealedVoucher && (
              <div className="space-y-4 relative z-10 text-center md:text-right">
                
                <div className="flex items-center justify-center p-4 bg-white/5 rounded-full w-16 h-16 mx-auto border border-white/10 shadow-md">
                  <span className="text-3xl">{revealedVoucher.icon}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-amber-300 font-bold text-base md:text-lg font-serif">
                    {revealedVoucher.title}
                  </h3>
                  <p className="text-pink-100/80 text-xs md:text-sm leading-relaxed font-serif font-light text-right px-1">
                    {revealedVoucher.description}
                  </p>
                </div>

                {/* Redeemable voucher number code */}
                <div className="bg-black/35 p-4 border border-white/10 rounded-2xl relative overflow-hidden select-all group text-center mt-6">
                  <div className="absolute inset-0 bg-white/[0.02] group-hover:opacity-10 transition"></div>
                  <span className="text-[10px] text-pink-200/40 block uppercase font-sans tracking-widest mb-1">قسيمة مخصصة لرغد</span>
                  <p className="text-xs text-rose-300 font-mono font-bold tracking-wider uppercase select-all">
                    {revealedVoucher.code}
                  </p>
                </div>

                <p className="text-[10px] text-pink-200/40 italic mt-2 text-center select-none">
                  *صوري القسيمة واعرضيها على آشور لتفعيل الوعد فوراً! 🎁*
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
