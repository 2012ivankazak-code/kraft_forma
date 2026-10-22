import React, { useState } from 'react';
import { ShoppingBag, Menu, X, PlayCircle } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReelsGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenReelsGuide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Коллекция', href: '#catalog' },
    { label: 'Из наших Reels', href: '#reels' },
    { label: 'О материалах', href: '#materials' },
    { label: 'Доставка и уход', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-[#1E1E1E] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-[#2C2B29] rounded-xs inline-block"></span>
            <span>KRAFT & FORMA</span>
          </a>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A564F]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#1E1E1E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#B8B0A2]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenReelsGuide}
              className="text-xs text-[#8A6345] hover:text-[#5A3F29] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 border border-[#D5C2B1] bg-[#F5EFE9] px-2.5 py-1 rounded-sm"
              title="Советы по съемке продающих видео"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Гайд по Reels</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action (Cart Button) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label={`Корзина, товаров: ${cartCount}`}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#2C2B29] hover:bg-[#1E1E1E] rounded-md transition-all active:scale-95 shadow-sm whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Корзина</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-bold bg-[#FAF8F5] text-[#2C2B29] rounded-sm tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C2B29] hover:bg-[#EFEAE2] rounded-md transition-colors"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#2C2B29] hover:bg-[#EFEAE2] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E8E2D8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReelsGuide();
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#8A6345] hover:bg-[#F5EFE9] rounded-md flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-[#8A6345]" />
              <span>Гайд: Сценарии Reels для продаж</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
