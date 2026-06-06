/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Mail, Heart, Sparkles, Feather } from "lucide-react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showSignature, setShowSignature] = useState(false);

  // Ashur's romantic personal letter in Arabic
  const fullLetterText = 
    `إلى أميرة روحي ونور عيني رغد.. ❤️\n\n` +
    `أكتب إليكِ هذه الكلمات وكلي امتنان لكل ثانية قضيناها معاً. منذ أن دخلتِ حياتي، تغير كل شيء فيها، فأضحى للصباح وجه آخر وللمساء معنى أعمق ومليء بالطمأنينة والسكون.\n\n` +
    `رغد، أنتِ لستِ مجرد حبيبة عادية، بل أنتِ نصف روحي الآخر الذي بحثتُ عنه طوال سنين عمري. في عينيكِ أجد الأمان والحب الصادق والخوف الحنون عليّ، وبقربكِ ينسى قلبي كل أوجاعه ويهيم طفلاً مدللاً بكنف عطفكِ ودلالكِ اللامتناهي.\n\n` +
    `أعدكِ أمام كل النجوم وأمام الأيام والعهود، أن أظل الحارس المخلص لابتسامتكِ، والسند الحقيقي الذي يحميكِ من غدر الصعاب وتعب السفر، وأن يظل حبي لكِ نهراً جارياً لا ينضب، ممتداً عبر هذه الأعوام وإلى نهاية الوجود.\n\n` +
    `شكراً لكِ لأنكِ شريكتي وحبيبتي وملهمتي وأجمل أقداري الرائعة.\n\n` +
    `أحبكِ اليوم، وأحبكِ غداً، وأحبكِ أكثر في كل نبضة تناديكِ..`;

  useEffect(() => {
    if (!isOpen) {
      setDisplayedText("");
      setShowSignature(false);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullLetterText.length) {
        setDisplayedText((prev) => prev + fullLetterText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setShowSignature(true);
      }
    }, 45); // Speed of the handwritten text typing

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div id="love-letter-envelope-container" className="relative text-right max-w-xl mx-auto py-12 px-4">
      {/* Decorative pulse background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 blur-3xl rounded-full z-0 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-10 z-10 relative">
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          💌 رسالتي السرية إليكِ
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 font-light max-w-sm mx-auto">
          انقري على ظرف الرسالة لكسر الختم الشمعي الأحمر القديم وقراءة عهد آشور الشخصي
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[300px] z-10 relative">
        {/* Closed Envelope view */}
        {!isOpen ? (
          <div
            onClick={() => setIsOpen(true)}
            className="group w-full max-w-sm bg-white/5 border border-white/10 hover:border-white/20 p-10 rounded-[32px] flex flex-col items-center text-center justify-center cursor-pointer transition transform hover:scale-105 hover:-translate-y-2.5 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            {/* Visual envelope flap styling */}
            <div className="absolute -top-[50px] left-0 w-full h-[150px] bg-white/5 transform -skew-y-12 origin-top-left -rotate-3 border-b border-white/10 opacity-50"></div>
            <div className="absolute -top-[70px] left-0 w-full h-[150px] bg-white/5 transform skew-y-12 origin-top-right rotate-3 border-b border-white/10 opacity-50"></div>

            {/* Glowing gold seal */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-full group-hover:border-white/20 transition-all z-10 mb-4 group-hover:shadow-lg group-hover:shadow-rose-600/10 hover:bg-white/10">
              <div className="relative">
                <Mail className="w-12 h-12 text-rose-400 group-hover:scale-115 transition duration-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
                  <Heart className="w-2.5 h-2.5 text-stone-950 fill-stone-950" />
                </div>
              </div>
            </div>

            <div className="z-10 space-y-1">
              <h3 className="text-pink-100 font-bold text-sm tracking-wide font-serif">
                إلى الغالية رغد
              </h3>
              <p className="text-pink-300/60 text-[11px] font-sans">
                صُمم الختم بماء الزعفران والقرنفل
              </p>
            </div>

            <div className="mt-8 px-4 py-2 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 rounded-full text-[11px] text-rose-300 font-extrabold flex items-center gap-1 z-10 transition">
              <Feather className="w-3.5 h-3.5 animate-pulse" />
              <span>انقري لكسر الختم وقراءة الرسالة 🔐</span>
            </div>
          </div>
        ) : (
          /* Opened Letter viewport with old rustic wood paper text */
          <div className="w-full max-w-lg bg-[#fbf5e6] text-[#3e2723] rounded-[32px] shadow-2xl border-4 border-amber-800/20 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between select-text animate-fade-in transition duration-1000">
            
            {/* Vintage paper parchment watermarks */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none bg-radial-gradient from-transparent via-[#f5ebcf]/20 to-[#eddca6]/40"></div>
            <div className="absolute top-2 left-2 rotate-12 text-rose-500/5 pointer-events-none select-none">
              <Feather className="w-40 h-40" />
            </div>

            {/* Back to envelope seal button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 bg-[#4e342e]/10 hover:bg-[#4e342e]/20 text-[#4e342e] font-bold text-xs px-3 py-1.5 rounded-lg focus:outline-none transition flex items-center gap-1 select-none"
            >
              <span>أغلق الرسالة 📨</span>
            </button>

            {/* Core Typed Letter content */}
            <div className="min-h-[300px] select-text">
              <p className="whitespace-pre-line text-sm md:text-base leading-relaxed font-serif font-semibold text-right text-[#3e2723]/95">
                {displayedText}
                {/* Typing dot block */}
                {!showSignature && (
                  <span className="inline-block w-2.5 h-4 bg-rose-500 animate-ping mr-1"></span>
                )}
              </p>
            </div>

            {/* Elegant Signature of Ashur */}
            {showSignature && (
              <div
                id="ashur-letter-signature"
                className="flex flex-col items-end justify-center pt-8 border-t border-[#4e342e]/10 mt-6 select-all animate-fade-in"
              >
                <div className="flex items-center gap-1.5 text-xs text-rose-800 font-serif font-bold italic mb-1.5">
                  <Feather className="w-3.5 h-3.5" />
                  <span>توقيع محبكِ الأبدي</span>
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-[#bf360c] font-black tracking-widest pl-2">
                  آشور
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
