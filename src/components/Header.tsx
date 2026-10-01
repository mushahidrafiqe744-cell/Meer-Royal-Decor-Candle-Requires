import React from 'react';
import { ShoppingBag, Lock, Phone, MessageSquare, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { currentView, setCurrentView, cartCount, setCartOpen, language, setLanguage, contacts } = useStore();

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelUr: 'ہوم' },
    { id: 'shop', labelEn: 'Candles Collection', labelUr: 'موم بتیاں' },
    { id: 'party-decor', labelEn: 'Party & Disposables', labelUr: 'پارٹی ڈیکور' },
    { id: 'media', labelEn: 'Our Work', labelUr: 'ہماری ویڈیوز' },
    { id: 'booking', labelEn: 'Book Event', labelUr: 'بکنگ فارم' },
    { id: 'team', labelEn: 'Team', labelUr: 'ٹیم' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand Logo & Wordmark */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer flex items-center gap-3"
        >
          <img
            src="/src/assets/images/meer_royal_logo_1790857160911.jpg"
            alt="Meer Royal Decor Logo"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-900/30 shadow-xs group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B231D] group-hover:text-amber-800 transition-colors block leading-none">
              Meer Royal Decor
            </span>
            <span className="text-[10px] sm:text-xs text-amber-900 tracking-widest uppercase font-semibold block mt-0.5">
              Candle Requires
            </span>
          </div>
        </button>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line text with clean hover */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentView(link.id);
                if (link.id !== 'home') {
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`transition-colors whitespace-nowrap hover:text-amber-900 ${
                currentView === link.id ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-0.5' : ''
              }`}
            >
              {language === 'ur' ? link.labelUr : link.labelEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary actions (Cart, Language Switch, Admin Portal) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${contacts.primaryPhone.replace(/[^0-9]/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 rounded-md transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span>{contacts.primaryPhone}</span>
          </a>

          {/* Admin Portal Button */}
          <button
            onClick={() => setCurrentView('admin')}
            aria-label="Open Admin Portal"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
              currentView === 'admin'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'text-stone-700 bg-white border-stone-300 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* Shopping Bag Drawer Button */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open Shopping Bag"
            className="relative flex items-center justify-center p-2.5 bg-[#2C241E] text-white hover:bg-amber-950 rounded-md transition-all shadow-sm"
          >
            <ShoppingBag className="w-5 h-5 text-amber-100" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#FAF8F5] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-stone-200 bg-[#F5EFEB] text-xs font-medium text-stone-700 gap-4 no-scrollbar">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              setCurrentView(link.id);
              const el = document.getElementById(link.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`whitespace-nowrap px-2 py-1 transition-colors ${
              currentView === link.id ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            {language === 'ur' ? link.labelUr : link.labelEn}
          </button>
        ))}
      </div>
    </header>
  );
};
