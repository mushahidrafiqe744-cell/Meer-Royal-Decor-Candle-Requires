import React from 'react';
import { Sparkles, MessageCircle, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const VideoAdSection: React.FC = () => {
  const { contacts, language } = useStore();

  const handleWhatsAppOrderAd = () => {
    const text = `Hi ${contacts.ownerName}, I watched your Video Ad and want to order!`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="video-ad" className="py-16 bg-[#FAF8F5] border-y border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#2C241E] to-[#1F1914] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden border border-amber-900/30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Video Player */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-[16/10] border border-amber-900/40">
              <video
                id="promoVideo"
                autoPlay
                loop
                muted
                playsInline
                controls
                poster="/src/assets/images/story_candle_pouring_craft_1790853101150.jpg"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-decorating-a-birthday-party-table-41712-large.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right: Ad Content & WhatsApp CTA */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Special Promo 🔥</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              {language === 'ur'
                ? 'ہماری پریمیم تخلیقات کی لائیو جھلک'
                : 'Our Premium Creations In Action'}
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
              "Our beautiful handmade candles and stunning party decorations make your special moments truly magical. Play the video to experience the live quality. Order now and fill your home with warmth and fragrance."
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsAppOrderAd}
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'ur' ? 'واٹس ایپ پر ابھی آرڈر کریں' : 'Order Now via WhatsApp'}</span>
              </button>

              <a
                href={`tel:${contacts.primaryPhone.replace(/[^0-9]/g, '')}`}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors border border-white/20 cursor-pointer"
              >
                📞 Call {contacts.primaryPhone}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
