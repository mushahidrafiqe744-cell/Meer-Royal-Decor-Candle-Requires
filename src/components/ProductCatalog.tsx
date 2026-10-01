import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';

export const ProductCatalog: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, language } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const categories: { id: CategoryType; labelEn: string; labelUr: string }[] = [
    { id: 'all', labelEn: 'All Creations', labelUr: 'تمام آئٹمز' },
    { id: 'luxury-jars', labelEn: 'Luxury Scented Jars', labelUr: 'خوشبودار جار کینڈلز' },
    { id: 'scented-candles', labelEn: 'Botanical Tins', labelUr: 'بوٹینیکل ٹِنز' },
    { id: 'bubble-candles', labelEn: 'Aesthetic Bubble Candles', labelUr: 'ببل و آرٹ کینڈلز' },
    { id: 'party-decor', labelEn: 'Party Decor & Arches', labelUr: 'پارٹی آرچ اور ڈیکور' },
    { id: 'disposables', labelEn: 'Theme Disposables', labelUr: 'ڈسپوزایبل سیٹس' },
    { id: 'gift-sets', labelEn: 'Luxury Gift Hampers', labelUr: 'گفٹ باکس ہیمپر' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchUrdu = product.nameUrdu?.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchNotes = product.scentNotes?.some(n => n.toLowerCase().includes(q));
          if (!matchName && !matchUrdu && !matchDesc && !matchNotes) {
            return false;
          }
        }
        // Price filter
        if (product.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <section id="shop" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2">
            Artisanal Fragrance & Event Couture
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? 'ہماری پریمیم کلیکشن' : 'Our Handcrafted Collection'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            {language === 'ur'
              ? 'ہر موم بتی اور پارٹی ڈیکوریشن کو اعلیٰ ترین معیار اور نفاست سے تیار کیا گیا ہے'
              : 'Every candle is individually hand-poured with pure essential fragrance oils and natural waxes.'}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ur' ? 'پروڈکٹ کا نام یا خوشبو تلاش کریں...' : 'Search by candle, scent (Vanilla, Oud, Amber), decor...'}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800/40 text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/40"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2C241E] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  {language === 'ur' ? cat.labelUr : cat.labelEn}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-stone-300 max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-900">No matching creations found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Try searching with another keyword or reset the category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
