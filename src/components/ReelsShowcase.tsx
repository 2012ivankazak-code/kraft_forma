import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { REELS_ITEMS, ReelItem } from '../data/reels.ts';
import { Product } from '../data/products.ts';
import { formatPrice } from '../utils/cart.ts';

interface ReelsShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenReelsGuide: () => void;
}

export const ReelsShowcase: React.FC<ReelsShowcaseProps> = ({
  products,
  onSelectProduct,
  onOpenReelsGuide,
}) => {
  const [activeReelId, setActiveReelId] = useState<string>(REELS_ITEMS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const activeReel = REELS_ITEMS.find((r) => r.id === activeReelId) || REELS_ITEMS[0];
  const linkedProduct = products.find((p) => p.id === activeReel.productId);

  return (
    <section id="reels" className="py-14 sm:py-20 bg-[#F4EFEA] border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8A6345] font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Трафик из социальных сетей</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
              Предметы из наших Reels и Shorts
            </h2>
            <p className="text-sm sm:text-base text-[#686257] mt-1 max-w-xl">
              Люди приходят к нам из коротких видео процесса: заливка бетона, шлифовка дуба, 
              щелчок латунного тумблера. Нажмите на видео, чтобы увидеть предмет в деталях.
            </p>
          </div>

          <button
            onClick={onOpenReelsGuide}
            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#D5C2B1] text-[#64442A] text-xs font-semibold rounded-md shadow-xs transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-[#8A6345]" />
            <span>Сценарии Reels для продаж (Гайд)</span>
          </button>
        </div>

        {/* Interactive Reels Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Active Reel Interactive Player (Vertical 9:16) */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-9/16 rounded-xl overflow-hidden bg-[#1E1E1E] shadow-xl border-2 border-[#2C2B29]/10">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 flex flex-col justify-between p-4 pointer-events-none" />

              {/* Top Reel Bar */}
              <div className="relative z-10 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-sm">
                  <Eye className="w-3.5 h-3.5 text-white/80" />
                  <span className="font-mono font-medium">{activeReel.views}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                    aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                    aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Simulated Progress bar */}
              <div className="relative z-10 w-full h-1 bg-white/30 rounded-full overflow-hidden my-auto">
                <div
                  className={`h-full bg-white rounded-full ${
                    isPlaying ? 'w-3/4 transition-all duration-300' : 'w-1/3'
                  }`}
                />
              </div>

              {/* Bottom Info & Tagged Product Pin */}
              <div className="relative z-10 space-y-3">
                <div className="text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E8D0B3] font-mono">
                    {activeReel.soundName}
                  </span>
                  <p className="text-sm font-medium mt-0.5 leading-snug drop-shadow-sm">
                    {activeReel.hookText}
                  </p>
                </div>

                {/* Direct Product Card inside the Reel */}
                {linkedProduct && (
                  <div
                    onClick={() => onSelectProduct(linkedProduct)}
                    className="cursor-pointer bg-white/95 hover:bg-white text-[#1E1E1E] p-2.5 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={linkedProduct.image}
                        alt={linkedProduct.name}
                        className="w-10 h-10 object-cover rounded-md shrink-0 bg-[#E8E2D8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[11px] text-[#7A7469] block truncate">
                          Товар из видео:
                        </span>
                        <h4 className="text-xs font-bold text-[#1E1E1E] truncate">
                          {linkedProduct.name}
                        </h4>
                        <span className="text-xs font-mono font-semibold text-[#1E1E1E]">
                          {formatPrice(linkedProduct.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      className="px-2.5 py-1.5 bg-[#2C2B29] text-white text-[11px] font-medium rounded-md whitespace-nowrap shrink-0 hover:bg-black transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(linkedProduct);
                      }}
                    >
                      Заказать
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Reel selection playlist & context */}
          <div className="md:col-span-7 lg:col-span-8 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7C756B] mb-1">
              Выберите видео процесса:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REELS_ITEMS.map((item) => {
                const isSelected = item.id === activeReelId;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveReelId(item.id);
                      setIsPlaying(true);
                    }}
                    className={`text-left p-3.5 rounded-lg border transition-all flex gap-3 items-center ${
                      isSelected
                        ? 'bg-white border-[#2C2B29] shadow-sm ring-1 ring-[#2C2B29]'
                        : 'bg-white/70 hover:bg-white border-[#E0D8CB]'
                    }`}
                  >
                    <div className="relative w-14 h-18 rounded-md overflow-hidden shrink-0 bg-[#D8D2C7]">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#7A7469]">
                        <span className="font-mono font-semibold text-[#8A6345]">{item.views}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.duration}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1E1E1E] truncate mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6B655B] line-clamp-2 mt-1">
                        {item.conceptDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Practical Creator Tip banner */}
            <div className="mt-6 p-4 rounded-lg bg-[#EFE9E0] border border-[#DFD6C8] text-xs text-[#554F46] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-[#1E1E1E] block text-sm">
                  Как это работает в продажах?
                </span>
                <p className="mt-0.5">
                  В Reels зритель видит живой процесс и звук. В описании видео вы ставите:
                  «Заказать по ссылке в шапке профиля». По ссылке открывается этот сайт, где этот
                  же предмет оформляется за 30 секунд.
                </p>
              </div>
              <button
                onClick={onOpenReelsGuide}
                className="text-[#8A6345] hover:text-[#5A3F29] font-semibold whitespace-nowrap flex items-center gap-1 shrink-0"
              >
                <span>Открыть сценарии</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
