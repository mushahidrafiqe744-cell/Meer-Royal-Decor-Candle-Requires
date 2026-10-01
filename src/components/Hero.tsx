import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Star, Flame, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { language, setCurrentView, contacts } = useStore();

  const handleExplore = (sectionId: string) => {
    setCurrentView('home');
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppConsult = () => {
    const text = `Hi ${contacts.ownerName}, I saw your Pinterest style candle & party decor collection on Meer Royal Decor and would love to customize an order!`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-16 border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Pinterest High-Fashion Editorial Header */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50/80 border border-amber-200/70 rounded-full text-xs text-amber-900 font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>THE ART OF LUXURY CANDLES & CELEBRATION</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#2B231D] leading-[1.14]">
              {language === 'ur' ? (
                <>
                  خوشبو اور خوبصورتی کا <span className="italic font-normal text-amber-900">شاہکار</span>
                </>
              ) : (
                <>
                  Pure Botanical Fragrance <br />
                  <span className="italic font-normal text-amber-950 font-serif">& Bespoke Party Couture</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              {language === 'ur'
                ? 'خالص آرگینک موم اور نایاب پرفیوم آئلز سے بنی پریمیم موم بتیاں اور لاہور میں پارٹی بیلون ڈیکوریشن۔ ہر پروڈکٹ ہاتھ سے محبت سے تیار کی جاتی ہے۔'
                : 'Small-batch, hand-poured 100% soy & beeswax candles with crackling wood wicks, paired with whimsical celebration balloon arches and theme table accessories.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleExplore('shop')}
                className="px-6 py-3.5 bg-[#2C241E] hover:bg-stone-900 text-white font-medium text-xs sm:text-sm rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer group"
              >
                <span>{language === 'ur' ? 'شاپ کلیکشن' : 'Explore Candles Collection'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <span>💬 WhatsApp Custom Order</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-800 shrink-0" />
                <span>45+ Hours Clean Burn</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Damage-Proof Packing</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Same-Day Lahore Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual with Floating Pinterest Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_candle_lifestyle_editorial_1790853087024.jpg"
                alt="Editorial candle lifestyle setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold block">
                    Royal Amber & Vanilla Collection
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    Natural Aromatherapy Hand-Poured in Lahore
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating Review / Badge (Pinterest style) */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-stone-200/90 max-w-[240px] sm:max-w-[270px] space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
                <span className="text-xs font-bold text-stone-900 ml-1">4.9 / 5.0</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug italic">
                "The aesthetic quality and rich vanilla fragrance are unmatched in Pakistan!"
              </p>
              <div className="text-[10px] text-stone-400 font-semibold uppercase">
                Mahnoor T. · Verified Buyer
              </div>
            </div>

            {/* Circular Aesthetic Badge */}
            <div className="absolute -top-4 -right-4 sm:-right-5 w-20 h-20 rounded-full bg-[#2C241E] text-amber-100 p-2 flex flex-col items-center justify-center text-center shadow-xl border-2 border-white rotate-12">
              <span className="text-[9px] uppercase tracking-widest font-bold">100% Pure</span>
              <span className="text-[11px] font-serif font-bold text-amber-300">SOY WAX</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
