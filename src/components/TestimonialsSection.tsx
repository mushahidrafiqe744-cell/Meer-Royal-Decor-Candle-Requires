import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/initialData';
import { useStore } from '../context/StoreContext';

export const TestimonialsSection: React.FC = () => {
  const { language } = useStore();

  return (
    <section className="py-16 bg-[#F5EFEB] border-b border-[#E6DCCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Loved by Candle Enthusiasts & Hosts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? 'کسٹمرز کے تاثرات' : 'What Our Clients Say'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Real experiences from event hosts and home decor lovers across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-900/20" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">{t.name}</h4>
                  <span className="text-[11px] text-stone-400 font-medium">{t.city}</span>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-900 font-semibold px-2 py-0.5 rounded border border-amber-200/60 max-w-[120px] truncate">
                  {t.item}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
