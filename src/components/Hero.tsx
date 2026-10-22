import React from 'react';
import { ArrowDown, Sparkles, Instagram, ShieldCheck, Truck, Clock } from 'lucide-react';
import heroImg from '../assets/images/hero_scandinavian_craft_1792703705775.jpg';

interface HeroProps {
  onScrollToCatalog: () => void;
  onScrollToReels: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onScrollToReels }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20 border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid: Text left, atmospheric photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial message */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#7C756B] flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Скандинавский минимализм</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Мастерская ручной работы</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1E1E] leading-[1.15] text-balance">
              Честная фактура дуба, бетона и вороненой стали.
            </h1>

            <p className="text-base sm:text-lg text-[#555047] leading-relaxed max-w-xl">
              Создаем лаконичные интерьерные объекты для рабочего стола и дома. 
              Никакого пластика: только живой массив дуба под маслом Osmo, монолитный 
              архитектурный бетон М600 и тяжелый матовый металл.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 bg-[#2C2B29] hover:bg-[#1E1E1E] text-[#FAF8F5] text-sm font-semibold rounded-md transition-all active:scale-95 shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <span>Выбрать предмет</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToReels}
                className="px-5 py-3.5 bg-white hover:bg-[#F3EFE9] text-[#2C2B29] border border-[#DCD5C9] text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#8A6345]" />
                <span>Предметы из наших Reels</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-[#E8E2D8]/80 grid grid-cols-3 gap-4 text-xs text-[#6B655B]">
              <div>
                <span className="font-semibold text-[#1E1E1E] block text-sm">100% ручной труд</span>
                <span>Внимание к каждой фаске</span>
              </div>
              <div>
                <span className="font-semibold text-[#1E1E1E] block text-sm">СДЭК по РФ</span>
                <span>Бережная крафт-упаковка</span>
              </div>
              <div>
                <span className="font-semibold text-[#1E1E1E] block text-sm">От 24 часов</span>
                <span>Отправка готовых изделий</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity image showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden bg-[#EAE4D9] border border-[#DCD5C9] shadow-md aspect-16/10 sm:aspect-16/11 lg:aspect-4/3">
              <img
                src={heroImg}
                alt="Мастерская KRAFT & FORMA: предметы из дуба, архитектурного бетона и вороненой стали"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                  Камерный тираж · Санкт-Петербург
                </span>
                <span className="hidden sm:inline bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                  Бетон М600 · Массив дуба · Латунь
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Feature Strip */}
        <div className="mt-12 pt-8 border-t border-[#E8E2D8] grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#EFEAE2] flex items-center justify-center text-[#2C2B29] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1E1E1E]">Скандинавский дизайн</h4>
              <p className="text-xs text-[#6B655B] mt-0.5">Чистая геометрия и покой для взгляда</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#EFEAE2] flex items-center justify-center text-[#2C2B29] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1E1E1E]">Бесплатная доставка</h4>
              <p className="text-xs text-[#6B655B] mt-0.5">При заказе от 5 000 ₽ до ПВЗ СДЭК</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#EFEAE2] flex items-center justify-center text-[#2C2B29] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1E1E1E]">Натуральные материалы</h4>
              <p className="text-xs text-[#6B655B] mt-0.5">Эко-масло Osmo и пропитка от влаги</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#EFEAE2] flex items-center justify-center text-[#2C2B29] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1E1E1E]">Связь напрямую</h4>
              <p className="text-xs text-[#6B655B] mt-0.5">Быстрое согласование в Telegram</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
