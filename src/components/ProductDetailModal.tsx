import React, { useEffect, useState } from 'react';
import { X, Check, ShoppingBag, Zap, Shield, Sparkles } from 'lucide-react';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/cart.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickBuy,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAddedNotice(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-[#E8E2D8] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#1E1E1E] rounded-full shadow-xs transition-colors backdrop-blur-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: Image */}
          <div className="md:col-span-6 bg-[#F4EFEA] relative aspect-4/3 md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.reelsBadge && (
              <div className="absolute top-4 left-4 bg-[#2C2B29]/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-xs">
                {product.reelsBadge}
              </div>
            )}
          </div>

          {/* Right: Specifications & Purchasing */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#7A7469] flex items-center gap-2 mb-1">
                  <span>{product.materialCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.dimensions}</span>
                </div>
                <h2 id="product-modal-title" className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-[#1E1E1E] font-mono tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#9E9689] line-through font-mono tabular-nums">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#554F46] leading-relaxed">
                {product.description}
              </p>

              {/* Material specifications list */}
              <div className="space-y-2 pt-2 border-t border-[#F0EBE3]">
                <span className="text-xs font-semibold text-[#1E1E1E] block">
                  Материалы и технологии:
                </span>
                <ul className="text-xs text-[#6B655B] space-y-1">
                  {product.materialsList.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8A6345] font-bold">·</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care advice */}
              <div className="space-y-1.5 pt-2 border-t border-[#F0EBE3] text-xs text-[#6B655B]">
                <span className="font-semibold text-[#1E1E1E] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#8A6345]" />
                  <span>Уход за изделием:</span>
                </span>
                <ul className="space-y-0.5 pl-5 list-disc text-[11px]">
                  {product.careInstructions.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase module */}
            <div className="pt-6 mt-6 border-t border-[#F0EBE3] space-y-3">
              {/* Quantity stepper */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#7A7469]">Количество:</span>
                <div className="flex items-center border border-[#D5CFC5] rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-semibold hover:bg-[#F4EFEA] transition-colors"
                    aria-label="Уменьшить количество"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-[#1E1E1E] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-semibold hover:bg-[#F4EFEA] transition-colors"
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-3 px-3 bg-[#FAF8F5] hover:bg-[#EFEAE2] border border-[#D5CFC5] text-[#1E1E1E] text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Добавлено!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>В корзину</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onQuickBuy(product);
                  }}
                  className="w-full py-3 px-3 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Zap className="w-4 h-4 text-[#E8D0B3]" />
                  <span>Купить в 1 клик</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-[#7A7469] flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 text-[#8A6345]" />
                <span>Бесплатная доставка СДЭК от 5 000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
