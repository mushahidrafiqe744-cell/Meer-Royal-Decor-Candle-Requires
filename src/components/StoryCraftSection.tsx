import React from 'react';
import { Sparkles, Heart, Flame, Leaf, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StoryCraftSection: React.FC = () => {
  const { language, contacts } = useStore();

  const handleWhatsAppStory = () => {
    const text = `Hi ${contacts.ownerName}, I read about your handcrafted candle process and would like to order custom scents!`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#EAE2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Macro Craft Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 aspect-[4/3] bg-stone-100">
              <img
                src="/src/assets/images/story_candle_pouring_craft_1790853101150.jpg"
                alt="Artisan candle pouring process"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Inset Quote card */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-stone-200/90 max-w-xs space-y-1">
              <div className="text-amber-800 text-xs font-serif italic font-bold">
                "No mass-production. Every piece has a soul."
              </div>
              <p className="text-[11px] text-stone-500">
                Poured in intimate small batches in Lahore to ensure consistent aroma throw and clean flame.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Craft Details */}
          <div className="lg:col-span-6 space-y-5 pt-4 lg:pt-0">
            
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-amber-800" />
              <span>Artisanal Craftsmanship & Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {language === 'ur' ? (
                <span>خالص قدرتی اجزاء اور ہاتھ کا ہنر</span>
              ) : (
                <>
                  Crafted for Moments of <br />
                  <span className="italic font-normal text-amber-950 font-serif">Warmth, Peace & Memory</span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              At Meer Royal Decor, we believe candles are not just light sources—they are rituals. We blend 100% natural organic soy and coconut wax with therapeutic-grade botanical perfume oils and sustainably sourced wooden wicks that produce a calming fireplace crackle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80">
                <Flame className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Zero Black Smoke (Soot Free)</h4>
                  <p className="text-[11px] text-stone-500">Clean, non-toxic paraffin-free burn safe for kids & pets.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80">
                <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">High Aroma Retention</h4>
                  <p className="text-[11px] text-stone-500">Intense hot & cold fragrance throw even after months.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppStory}
                className="px-5 py-3 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-amber-200" />
                <span>Talk to our Master Chandler on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
