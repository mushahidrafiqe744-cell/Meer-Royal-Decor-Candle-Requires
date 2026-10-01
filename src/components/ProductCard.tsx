import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, language, contacts } = useStore();
  const [imageError, setImageError] = useState(false);

  const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
  const formattedOriginal = product.originalPrice ? `Rs. ${product.originalPrice.toLocaleString()}` : null;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = product.whatsappText
      ? product.whatsappText
      : `Hi ${contacts.ownerName}, I want to order "${product.name}" (${formattedPrice}) from Meer Royal Decor. Please confirm availability!`;
    const targetPhone = product.whatsappText?.includes('923290725117') ? '923290725117' : contacts.whatsappPhone;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-900/30 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Stage */}
      <div className="relative bg-[#F7F4EF] aspect-[4/3] overflow-hidden">
        
        {/* Subtle Text Tag */}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 z-10 bg-amber-900 text-amber-50 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
            Best Seller
          </span>
        )}
        {!product.isBestSeller && product.isNewArrival && (
          <span className="absolute top-3 left-3 z-10 bg-[#2C241E] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs">
            New Arrival
          </span>
        )}

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-amber-50 text-stone-400 p-4 text-center">
            <span className="text-3xl mb-1">🕯️</span>
            <span className="text-xs font-serif text-stone-700 font-semibold">{product.name}</span>
          </div>
        )}

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          aria-label="Quick View Details"
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 p-2 rounded-full shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Unboxed category metadata */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-amber-900">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-amber-700 font-semibold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {language === 'ur' && product.nameUrdu ? product.nameUrdu : product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Scent notes or features unboxed text */}
          {product.scentNotes && product.scentNotes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-600 mt-2">
              <span className="font-medium text-stone-700">Notes:</span>
              <span>{product.scentNotes.slice(0, 3).join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="font-serif text-lg font-bold text-stone-900 tabular-nums">
              {formattedPrice}
            </div>
            {formattedOriginal && (
              <div className="text-[11px] text-stone-400 line-through tabular-nums">
                {formattedOriginal}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* WhatsApp Quick Link */}
            <button
              onClick={handleWhatsAppOrder}
              title="DM for Price List / Order on WhatsApp"
              className="px-2.5 py-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60 cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">DM WhatsApp</span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="px-3 py-2 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-100" />
              <span>{language === 'ur' ? 'بیگ' : 'Add'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
