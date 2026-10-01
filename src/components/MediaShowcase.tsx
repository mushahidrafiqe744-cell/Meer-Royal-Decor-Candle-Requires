import React, { useState } from 'react';
import { Play, MessageCircle, Heart, Film, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MediaShowcase: React.FC = () => {
  const { mediaList, language, contacts } = useStore();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleWhatsAppOrderMedia = (title: string) => {
    const text = `Hi ${contacts.ownerName}, I saw your video/showcase: "${title}" on Meer Royal Decor and would love to order something similar!`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="media" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1 flex items-center justify-center gap-1.5">
            <Film className="w-4 h-4 text-amber-800" />
            <span>Live Craft & Event Reels</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? '✨ ہماری پروڈکٹس کی لائیو جھلکیاں' : '✨ Watch Our Artistry In Action'}
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            {language === 'ur'
              ? 'دیکھیں کہ کس طرح ہر شمع کو بڑی محبت سے ہاتھ سے تیار کیا جاتا ہے'
              : 'Real behind-the-scenes clips of candle pouring, flame testing, and live party event decorations.'}
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between group"
            >
              <div className="relative aspect-[9/12] bg-stone-900 overflow-hidden flex items-center justify-center">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    playsInline
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-amber-200 text-[11px] font-medium px-2.5 py-0.5 rounded">
                  {item.category || 'Live Reel'}
                </span>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="font-serif text-base font-bold text-stone-900 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span>{item.createdAt}</span>
                  <div className="flex items-center gap-1 text-stone-600 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{item.likes || 120}+</span>
                  </div>
                </div>

                <button
                  onClick={() => handleWhatsAppOrderMedia(item.title)}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Order This Look via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
