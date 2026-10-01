import React from 'react';
import { useStore } from '../context/StoreContext';
import { CategoryType } from '../types';

interface CategoryItem {
  id: CategoryType;
  title: string;
  titleUrdu: string;
  image: string;
  count: string;
}

export const CategoryStoriesBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setCurrentView, language } = useStore();

  const categories: CategoryItem[] = [
    {
      id: 'all',
      title: 'All Items',
      titleUrdu: 'تمام اشیاء',
      image: '/src/assets/images/hero_candle_lifestyle_editorial_1790853087024.jpg',
      count: '6 Products'
    },
    {
      id: 'luxury-jars',
      title: 'Aroma Jars',
      titleUrdu: 'خوشبودار جارز',
      image: '/src/assets/images/product_scented_candle_jar_1790775161737.jpg',
      count: 'Pure Soy'
    },
    {
      id: 'bubble-candles',
      title: 'Bubble Art',
      titleUrdu: 'ببل کینڈلز',
      image: '/src/assets/images/product_luxury_bubble_candle_1790775202396.jpg',
      count: 'Handmade'
    },
    {
      id: 'party-decor',
      title: 'Event Decor',
      titleUrdu: 'پارٹی ڈیکور',
      image: '/src/assets/images/product_party_decor_setup_1790775176807.jpg',
      count: 'Balloon Arches'
    },
    {
      id: 'disposables',
      title: 'Tableware',
      titleUrdu: 'ڈسپوزایبل پلیٹس',
      image: '/src/assets/images/product_disposable_tableware_1790775193176.jpg',
      count: 'Theme Sets'
    },
    {
      id: 'gift-sets',
      title: 'Gift Hampers',
      titleUrdu: 'گفٹ ہیمپر',
      image: '/src/assets/images/category_candle_hamper_lifestyle_1790853114266.jpg',
      count: 'Velvet Boxes'
    }
  ];

  const handleClick = (catId: CategoryType) => {
    setSelectedCategory(catId);
    setCurrentView('home');
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] py-6 border-b border-[#EBE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-amber-900 ring-offset-2 ring-offset-[#FAF8F5]'
                      : 'ring-1 ring-stone-300 group-hover:ring-amber-700'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-200">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <span
                    className={`text-xs block font-serif font-bold transition-colors ${
                      isSelected ? 'text-amber-950 font-bold' : 'text-stone-700 group-hover:text-amber-900'
                    }`}
                  >
                    {language === 'ur' ? cat.titleUrdu : cat.title}
                  </span>
                  <span className="text-[10px] text-stone-400 block font-sans">{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
