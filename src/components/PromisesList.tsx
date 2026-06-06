/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromiseItem } from "../types";
import { Heart, ShieldCheck, Milestone, Sun, Pocket, Sparkles } from "lucide-react";

export default function PromisesList() {
  const promises: PromiseItem[] = [
    {
      id: 1,
      text: "أعدكِ بأن أحافظ على تلك الابتسامة الخلابة على وجهكِ الجميل طالما أنا أتنفس وأرتوي بالحياة.",
      category: "السعادة والأمان",
      icon: "ShieldCheck"
    },
    {
      id: 2,
      text: "أعدكِ أن أكون سندكِ الدافئ، وملجأكِ الصادق، وصديقكِ المقرب جداً في كافة أوقاتكِ العاصفة قبل الهادئة.",
      category: "الدعم والمساندة",
      icon: "Heart"
    },
    {
      id: 3,
      text: "أعدكِ بأن أظل أحبكِ كل يوم بطريقة جديدة، وأن يزداد تعلقي بك في كل صباح نستقبله معاً.",
      category: "الحب والاستمرار",
      icon: "Sun"
    },
    {
      id: 4,
      text: "أعدكِ بشراكة أبدية ملؤها الاحترام التام، التقدير المستمر وبأن أظل مسانداً لأحلامكِ وطموحاتكِ كأنها بؤرة حياتي.",
      category: "الاحترام والنمو المشترك",
      icon: "Milestone"
    },
    {
      id: 5,
      text: "أعدكِ بأن نظل نحتفل بذكرانا وطفولتنا معاً مهما تقدم بنا العمر وتراكمت علينا مسؤوليات الحياة.",
      category: "العهد الأبدي",
      icon: "Sparkles"
    }
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-amber-400" />;
      case "Milestone":
        return <Milestone className="w-5 h-5 text-indigo-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />;
      default:
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animation-pulse" />;
    }
  };

  return (
    <div id="promises-vows-section" className="relative text-right max-w-2xl mx-auto py-12 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-600">
          💍 وعودي لكِ — عهدي الأبدي
        </h2>
        <p className="text-stone-400 text-xs md:text-sm mt-3 max-w-sm mx-auto leading-relaxed font-light">
          عهود قطعتها على روحي لكِ يا رغد، لتكون منارة تحدد وجهتنا المشتركة دوماً وتثبت عمق مشاعري
        </p>
      </div>

      <div className="space-y-4">
        {promises.map((p, idx) => {
          return (
            <div
              key={p.id}
              className="group bg-white/5 border border-white/10 hover:border-white/20 p-5 rounded-3xl transition duration-300 hover:shadow-2xl hover:-translate-y-0.5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-right backdrop-blur-md"
              dir="rtl"
            >
              <div className="flex gap-4 items-center flex-1">
                {/* Heart bullets */}
                <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 transition shrink-0">
                  <div className="relative">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-600 animate-pulse" />
                    <span className="absolute inset-0 rounded-full border border-rose-500/40 animate-ping"></span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-amber-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 inline-block font-mono">
                    {p.category}
                  </span>
                  <p className="text-pink-100 text-sm md:text-base leading-relaxed font-serif font-light">
                    {p.text}
                  </p>
                </div>
              </div>

              {/* Decorative side badge */}
              <div className="mr-auto self-end md:self-center shrink-0 p-1 bg-white/5 rounded-full border border-white/10">
                {getCategoryIcon(p.icon)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm max-w-md mx-auto">
        <p className="text-pink-200/70 text-xs italic">
          "سوف أظل وفياً لكل وعد خطه قلمي ورعاه قلبي يا أميرتي رغد" — آشور
        </p>
      </div>
    </div>
  );
}
