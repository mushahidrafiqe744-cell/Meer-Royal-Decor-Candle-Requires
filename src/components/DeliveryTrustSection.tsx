import React from 'react';
import { Truck, ShieldCheck, Box, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DeliveryTrustSection: React.FC = () => {
  const { language } = useStore();

  return (
    <section id="delivery" className="py-14 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'ur' ? '⚡ تیز اور محفوظ ہوم ڈیلیوری' : '⚡ Safe, Swift & Reliable Delivery Nationwide'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
            {language === 'ur'
              ? 'ہم آپ کا آرڈر پوری احتیاط اور خوبصورت پیکنگ کے ساتھ آپ کی دہلیز تک پہنچاتے ہیں'
              : 'From fragile handmade glass jars to grand party balloon sets, every order is packed with meticulous care.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-900 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Lahore Same-Day Express
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Order before 2:00 PM for same-day evening delivery across all Lahore areas with live rider updates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-900 mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              All Pakistan Courier (COD)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Safe trackable delivery to Karachi, Islamabad, Faisalabad, Multan, Peshawar, and 120+ cities in 2-4 business days.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-900 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Breakage-Free Bubble Packaging
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Multi-layer shockproof thermal bubble wraps ensure candle glass and delicate wax motifs arrive in pristine condition.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
