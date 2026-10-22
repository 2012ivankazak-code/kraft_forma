import React from 'react';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/cart.ts';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onQuickBuy,
}) => {
  return (
    <article className="group flex flex-col bg-white rounded-lg border border-[#E8E2D8] hover:border-[#CFC7B9] hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Visual Slot: ~70% of card visual weight */}
      <div
        onClick={() => onSelect(product)}
        className="relative cursor-pointer aspect-4/3 bg-[#F0EBE3] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Subtle subtle top tag (anti-pill, clean unboxed label) */}
        <div className="absolute top-3 left-3">
          {product.reelsBadge && (
            <span className="text-[11px] font-medium tracking-tight bg-[#2C2B29]/80 backdrop-blur-sm text-[#FAF8F5] px-2 py-0.5 rounded-xs">
              {product.reelsBadge}
            </span>
          )}
        </div>

        {/* Quick view hover affordance */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-[#1E1E1E] text-xs font-semibold rounded-md shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>Быстрый просмотр</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-[#7A7469] mb-1.5">
            <span>{product.materialCategory}</span>
            <span aria-hidden="true">·</span>
            <span>{product.dimensions}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#8A6345] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B655B] line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-4 mt-4 border-t border-[#F0EBE3] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#1E1E1E] font-mono tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-[#9E9689] line-through font-mono tabular-nums">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#4F772D] font-medium block">
              {product.productionTime}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onQuickBuy(product)}
              className="px-2.5 py-2 text-xs font-medium text-[#2C2B29] bg-[#F4EFEA] hover:bg-[#EAE4DC] rounded-md transition-colors whitespace-nowrap flex items-center gap-1"
              title="Купить сразу в 1 клик"
            >
              <Zap className="w-3.5 h-3.5 text-[#8A6345]" />
              <span className="hidden sm:inline">1 клик</span>
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-white bg-[#2C2B29] hover:bg-[#1E1E1E] rounded-md transition-all active:scale-95 shadow-xs whitespace-nowrap flex items-center gap-1.5"
              aria-label={`Добавить в корзину: ${product.name}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">В корзину</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
