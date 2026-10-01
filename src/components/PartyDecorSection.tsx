import React from 'react';
import { Sparkles, Calendar, MessageCircle, PartyPopper, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PartyDecorSection: React.FC = () => {
  const { language, contacts, setCurrentView } = useStore();

  const handleBookingRedirect = () => {
    setCurrentView('home');
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppConsult = (theme: string) => {
    const text = `Hi ${contacts.ownerName}, I'm interested in booking Party Decor: "${theme}" for an upcoming celebration in Lahore. Please share packages and availability!`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="party-decor" className="py-16 bg-[#F5EFEB] border-y border-[#E6DCce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1 flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-amber-800" />
              <span>Events, Functions & Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {language === 'ur' ? 'پارٹی بیلونز اور ڈسپوزایبل کلیکشن' : 'Party Styling & Disposable Tableware'}
            </h2>
          </div>
          <button
            onClick={handleBookingRedirect}
            className="px-5 py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            {language === 'ur' ? 'تاریخ بک کریں' : 'Reserve Event Date'}
          </button>
        </div>

        {/* Featured 3-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Balloon Arch & Backdrops */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <span className="absolute top-3 left-3 z-10 bg-amber-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Custom Themes
                </span>
                <img
                  src="/src/assets/images/product_party_decor_setup_1790775176807.jpg"
                  alt="Birthday Balloon Decor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider">
                  Event Backdrops
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Custom Organic Balloon Arches
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Metallic champagne, pastel shades, neon signs, and floral circular arch frames installed on-site in Lahore for birthdays & baby showers.
                </p>

                <ul className="text-xs text-stone-600 space-y-1 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Includes high-power LED fairy lights</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Personalized acrylic ring name plate</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleWhatsAppConsult('Organic Balloon Arch Setup')}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Get WhatsApp Quote / Theme Idea</span>
              </button>
            </div>
          </div>

          {/* Card 2: Disposable Tableware */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <span className="absolute top-3 left-3 z-10 bg-emerald-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Food Grade & Eco
                </span>
                <img
                  src="/src/assets/images/product_disposable_tableware_1790775193176.jpg"
                  alt="Party Disposable Tableware"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider">
                  Tableware & Cutlery
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Partition Plates, Ripple Cups & Napkins
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Heavyweight food-safe partition dinner plates, gold foil party cups, biodegradable forks & spoons for hassle-free catering.
                </p>

                <ul className="text-xs text-stone-600 space-y-1 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Available in packs of 25, 50, and 100</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Multiple color themes (Gold, Pastel, Black)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleWhatsAppConsult('Party Disposable Tableware Bulk')}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Order Tableware Sets on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Card 3: Candlelight Dinners & Intimate Setups */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <span className="absolute top-3 left-3 z-10 bg-[#2C241E] text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Signature Vibe
                </span>
                <img
                  src="/src/assets/images/hero_luxury_candles_decor_1790775140482.jpg"
                  alt="Candlelight Dinner Setup"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider">
                  Romantic & Intimate
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Candlelight Tablescapes & Centerpieces
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Aromatic candles, glass hurricane lanterns, dried floral runners, and golden charger plates for anniversary and proposal dinners.
                </p>

                <ul className="text-xs text-stone-600 space-y-1 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Subtle luxury fragrances included</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Hassle-free setup & teardown</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleWhatsAppConsult('Candlelight Dinner Tablescape')}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Book Romantic Setup on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
