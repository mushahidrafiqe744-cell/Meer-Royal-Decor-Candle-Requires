import React, { useState } from 'react';
import { Truck, MapPin, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { language } = useStore();

  if (!visible) return null;

  return (
    <div className="bg-[#2C241E] text-[#F3ECE4] text-xs py-2 px-4 border-b border-amber-950/40 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-amber-200/80 font-medium">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Lahore Studio & Workshop</span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2 text-stone-200">
          <Sparkles className="w-3 h-3 text-amber-400 hidden sm:inline" />
          {language === 'ur' ? (
            <span>📍 لاہور میں سیم ڈے ایکسپریس ڈیلیوری | 🇵🇰 پورے پاکستان میں کیش آن ڈیلیوری دستیاب</span>
          ) : (
            <span>Same-Day Express in Lahore · Nationwide Pakistan Courier · Free Delivery over Rs. 3,500</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-amber-300 font-semibold tracking-wider text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
            Use Code: ROYAL10 (10% Off)
          </span>
          <button
            onClick={() => setVisible(false)}
            aria-label="Close announcement"
            className="text-stone-400 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
