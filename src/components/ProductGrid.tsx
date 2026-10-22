import React, { useState } from 'react';
import { ProductCard } from './ProductCard.tsx';
import { Product } from '../data/products.ts';
import { Layers } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onQuickBuy,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'concrete' | 'wood' | 'metal'>('all');

  const filterTabs = [
    { id: 'all', label: 'Вся капсула' },
    { id: 'concrete', label: 'Архитектурный бетон' },
    { id: 'wood', label: 'Массив дуба' },
    { id: 'metal', label: 'Сталь и латунь' },
  ] as const;

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="catalog" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#7C756B] mb-1.5 flex items-center gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Каталог мастерской</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            Флагманская коллекция
          </h2>
          <p className="text-sm text-[#686257] mt-1 max-w-lg">
            Мы не делаем тысячи безликих сувениров. Только отобранные позиции, доведенные 
            до тактильного и визуального совершенства.
          </p>
        </div>

        {/* Functional Segmented Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#EFEAE2] rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#1E1E1E] shadow-xs'
                    : 'text-[#6B655B] hover:text-[#1E1E1E]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-column / 2-column Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            onAddToCart={onAddToCart}
            onQuickBuy={onQuickBuy}
          />
        ))}
      </div>

      {/* Custom Orders / Atelier Note */}
      <div className="mt-12 p-6 sm:p-8 rounded-xl bg-[#F5EFE9] border border-[#E2D7CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E]">
            Нужен предмет по индивидуальным размерам?
          </h3>
          <p className="text-xs sm:text-sm text-[#665E54] leading-relaxed">
            Изготавливаем органайзеры под вашу аппаратуру, настенные рейлинги нужной длины, 
            наносим лазерную или латунную гравировку с инициалами в подарок.
          </p>
        </div>
        <a
          href="https://t.me/kraft_forma_workshop"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Обсудить заказ в Telegram
        </a>
      </div>
    </section>
  );
};
