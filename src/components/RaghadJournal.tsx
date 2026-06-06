/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from "react";
import { BookOpen, Heart, Calendar, Trash2, CheckCircle2, ChevronDown } from "lucide-react";
import { JournalEntry } from "../types";

export default function RaghadJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load saved journal replies from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("raghad_love_entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed an initial lovable response message from Raghad to demonstrate the diary capability beautifully
      const defaultEntry: JournalEntry = {
        id: "seed-1",
        content: "حبيبي وعمري آشور.. ❤️\n\nأجمل شيء حدث لي بالوجود أنك بجانبي، وعدنا لبعضنا حب ممتد لا تمحوه المسافات ولا تطويه الأيام. كتبت هذه الحروف في دفتر يومياتنا السري وأريدك أن تعلم دائماً بأني محظوظة بوجودك كأمير وحارس لقلبي الوفي.\n\nروحي دوماً تنمو بقربك.. رغد.",
        timestamp: "١١ يونيو ٢٠٢٦",
        sender: "رغد"
      };
      setEntries([defaultEntry]);
      localStorage.setItem("raghad_love_entries", JSON.stringify([defaultEntry]));
    }
  }, []);

  const handleSaveEntry = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Build fresh Arabic formatted date
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formattedDate = formatter.format(today);

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      content: newMessage,
      timestamp: formattedDate,
      sender: "رغد"
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("raghad_love_entries", JSON.stringify(updated));
    setNewMessage("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("raghad_love_entries", JSON.stringify(updated));
  };

  return (
    <div id="diary-journal-widget" className="relative text-right max-w-2xl mx-auto py-12 px-4 select-none">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/10 mb-3 animate-pulse">
          <BookOpen className="w-3.5 h-3.5" />
          <span>دفتر مذكرات الحب السري 🔒</span>
        </span>
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          اكتبِي ردّكِ إلى آشور 💬
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 font-light max-w-sm mx-auto leading-relaxed">
          مساحة سرية ودافئة لرغد لتسجيل مشاعرها وردها الجميل. ستُحفظ ردودكِ هنا كذكرى ترسم ملامح عهدنا
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Notebook Area */}
        <div className="lg:col-span-6 w-full">
          <form
            onSubmit={handleSaveEntry}
            className="bg-[#faf6eb] text-[#3e2723] rounded-2xl shadow-xl border-2 border-amber-700/20 p-6 flex flex-col justify-between relative overflow-hidden h-[24rem]"
          >
            {/* Lined paper visual presets */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 to-amber-700"></div>
            
            <div className="flex justify-between items-center w-full mb-3 select-none">
              <span className="text-[10px] text-amber-800 font-bold bg-[#efe1bf] px-2.5 py-1 rounded-full">
                صفحة مذكرات جديدة ✏️
              </span>
              <BookOpen className="w-5 h-5 text-amber-800 opacity-60" />
            </div>

            {/* Notebook Lined Textarea */}
            <textarea
              placeholder="اكتبِي نبضات قلبكِ، كلماتكِ، ووعودكِ الدافئة إلى آشور هنا..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 w-full bg-transparent resize-none border-none outline-none font-serif text-sm md:text-base leading-[2rem] placeholder-[#8d6e63] text-[#3e2723] font-semibold text-right p-1 focus:ring-0 select-text"
              dir="rtl"
              maxLength={1500}
            />

            {/* Save Controls */}
            <div className="border-t border-amber-700/10 pt-4 mt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="w-full bg-gradient-to-r from-rose-600 to-amber-700 text-white font-bold py-2.5 rounded-xl text-xs hover:opacity-95 active:scale-[98%] transition flex items-center justify-center gap-1.5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>حفظ الرسالة في سجل الذكريات الأبدية ✨</span>
              </button>

              {/* Character length indicator */}
              <div className="text-right text-[10px] text-amber-800/60 font-mono">
                {newMessage.length} / 1500 حرف
              </div>
            </div>

            {/* Success Prompt Overlay */}
            {showSuccess && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-emerald-900 absolute rounded-xl p-4 text-white text-center border-2 border-emerald-500/20 shadow-2xl animate-fade-in flex flex-col items-center justify-center select-none">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2 animate-bounce" />
                <h4 className="font-bold text-sm">تم الحفظ بنجاح! 🎉</h4>
                <p className="text-[10px] text-emerald-200 mt-1">
                  حُفظت رسالتكِ للذكرى في هذا الدفتر السري
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Saved Memories Log Notebook */}
        <div className="lg:col-span-6 w-full space-y-4 max-h-[24rem] overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1 mb-2">
            <span>سجل رسائلكِ السابقة ({entries.length})</span>
            <BookOpen className="w-4 h-4" />
          </h3>

          {entries.length === 0 ? (
            <div className="bg-stone-900/40 border border-stone-850 p-8 rounded-2xl text-center">
              <p className="text-stone-500 text-xs">لا توجد رسائل محفوظة حتى الآن في سجل الذكرى</p>
            </div>
          ) : (
            entries.map((item) => (
              <div
                key={item.id}
                className="bg-[#f0ece1]/90 hover:bg-[#faf6eb] text-[#3e2723] p-5 rounded-2xl border-2 border-amber-800/10 shadow-md relative transition flex flex-col justify-between"
              >
                {/* Vintage stamp visual */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[9px] text-[#4e342e]/60 bg-[#efe1bf] rounded px-1.5 py-0.5 font-mono select-none">
                    {item.timestamp}
                  </span>
                  
                  {/* Delete button only shown if not the default template entry to avoid stripping demo elements */}
                  {item.id !== "seed-1" && (
                    <button
                      onClick={() => handleDeleteEntry(item.id)}
                      className="text-[#d84315] hover:bg-red-100 p-1 rounded-full transition focus:outline-none"
                      title="محو الرسالة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sender badge */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#bf360c] font-serif mb-2 justify-end">
                  <span>من: {item.sender}</span>
                  <Heart className="w-3 h-3 fill-[#bf360c]" />
                </div>

                {/* Entry content text body */}
                <p className="text-[#4e342e] text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line text-right select-text py-2">
                  {item.content}
                </p>

                <div className="flex justify-start border-t border-[#4e342e]/10 pt-2 text-[10px] text-[#8d6e63] font-serif text-left">
                  <span>ختم الذكرى الأبدية 🔒</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
