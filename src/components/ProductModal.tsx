import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Star, Flame, Clock, Ruler, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, language, contacts } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedScentVariant, setSelectedScentVariant] = useState<string>('');

  if (!selectedProduct) return null;

  const formattedPrice = `Rs. ${selectedProduct.price.toLocaleString()}`;
  const formattedOriginal = selectedProduct.originalPrice ? `Rs. ${selectedProduct.originalPrice.toLocaleString()}` : null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedScentVariant || selectedProduct.scentNotes?.[0]);
    setSelectedProduct(null);
  };

  const handleWhatsApp = () => {
    const scentText = selectedScentVariant ? ` (Scent: ${selectedScentVariant})` : '';
    const text = `Hi ${contacts.ownerName}, I would like to order "${selectedProduct.name}"${scentText}, Qty: ${quantity}, Total: Rs. ${(selectedProduct.price * quantity).toLocaleString()} from Meer Royal Decor.`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-700 rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-[#F7F4EF] relative aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {selectedProduct.isBestSeller && (
            <span className="absolute top-4 left-4 bg-amber-900 text-amber-50 text-xs font-semibold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider font-semibold">
                <span>{selectedProduct.category.replace('-', ' ')}</span>
                <span>·</span>
                <div className="flex items-center text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                  <span className="font-bold">{selectedProduct.rating.toFixed(1)}</span>
                  <span className="text-stone-400 ml-1">({selectedProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                {language === 'ur' && selectedProduct.nameUrdu ? selectedProduct.nameUrdu : selectedProduct.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-2xl font-bold text-amber-950 tabular-nums">
                  {formattedPrice}
                </span>
                {formattedOriginal && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formattedOriginal}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded ml-2">
                  In Stock · Ready to Dispatch
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Specifications list */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs text-stone-700">
              {selectedProduct.burnTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Burn Time</span>
                    <span className="font-medium">{selectedProduct.burnTime}</span>
                  </div>
                </div>
              )}
              {selectedProduct.waxType && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Wax Blend</span>
                    <span className="font-medium">{selectedProduct.waxType}</span>
                  </div>
                </div>
              )}
              {selectedProduct.dimensions && (
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Dimensions</span>
                    <span className="font-medium">{selectedProduct.dimensions}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Fragrance</span>
                  <span className="font-medium">100% Pure Essential</span>
                </div>
              </div>
            </div>

            {/* Fragrance Notes pills selection if available */}
            {selectedProduct.scentNotes && selectedProduct.scentNotes.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Select Fragrance Note / Theme:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.scentNotes.map((scent, i) => {
                    const isSelected = selectedScentVariant === scent || (!selectedScentVariant && i === 0);
                    return (
                      <button
                        key={scent}
                        onClick={() => setSelectedScentVariant(scent)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                          isSelected
                            ? 'bg-amber-900 text-white font-medium shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {scent}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-md bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span>Add {quantity} to Bag · Rs. {(selectedProduct.price * quantity).toLocaleString()}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Order / Customization</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
