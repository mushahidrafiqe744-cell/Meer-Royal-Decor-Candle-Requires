import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, Sparkles, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { contacts, setCurrentView, language } = useStore();

  const scrollTo = (id: string) => {
    setCurrentView('home');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241D17] text-[#E8DFC8] pt-14 pb-10 border-t border-amber-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand Wordmark & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/meer_royal_logo_1790857160911.jpg"
                alt="Meer Royal Decor Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-600/40 shadow-sm"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-none">
                  Meer Royal Decor
                </h3>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold block mt-1">
                  Candle Requires
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'ur'
                ? 'خالص موم اور نایاب پرفیوم آئلز سے بنی پریمیم موم بتیاں اور لاہور میں پرشکوہ تقریبات کی ڈیکوریشن سروس۔'
                : 'Hand-poured pure organic soy wax aromatherapy candles, bespoke event styling, and curated theme party supplies.'}
            </p>
            <div className="text-xs text-amber-300/90 font-medium">
              📍 Studio & Workshop: Lahore, Pakistan
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Store Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-amber-300 transition-colors">
                  Aesthetic Scented Jar Candles
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-amber-300 transition-colors">
                  Bubble & Sculptural Soy Wax
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('party-decor')} className="hover:text-amber-300 transition-colors">
                  Birthday & Event Balloon Arches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('party-decor')} className="hover:text-amber-300 transition-colors">
                  Party Disposable Dinner Sets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('shop')} className="hover:text-amber-300 transition-colors">
                  Custom Gift Boxes & Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore & Bookings
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => scrollTo('media')} className="hover:text-amber-300 transition-colors">
                  Watch Our Work (Live Reels)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('booking')} className="hover:text-amber-300 transition-colors">
                  Event Date Slot Booking
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('team')} className="hover:text-amber-300 transition-colors">
                  Meet Our Leadership & Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('delivery')} className="hover:text-amber-300 transition-colors">
                  Same-Day Lahore & Pakistan Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="text-amber-300 hover:text-white transition-colors font-medium">
                  🔒 Owner Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <a
                href={`tel:${contacts.primaryPhone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call: {contacts.primaryPhone} (Tayyaba)</span>
              </a>

              <a
                href={`https://wa.me/${contacts.whatsappPhone}?text=Hi%20Tayyaba,%20I'm%20visiting%20Meer%20Royal%20Decor`}
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition-colors text-emerald-300"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {contacts.primaryPhone}</span>
              </a>

              <a
                href={`tel:${contacts.secondaryPhone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-stone-400"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Alt: {contacts.secondaryPhone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; 2026 Meer Royal Decor & Candle Requires. All Rights Reserved. Handcrafted in Lahore, Pakistan.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Secure Shopping</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>WhatsApp Fast Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
