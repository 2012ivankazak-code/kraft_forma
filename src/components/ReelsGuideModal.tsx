import React from 'react';
import { X, PlayCircle, Video, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { CREATOR_GUIDE_TIPS } from '../data/reels.ts';

interface ReelsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelsGuideModal: React.FC<ReelsGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть руководство"
          className="absolute top-4 right-4 text-[#7A7469] hover:text-[#1E1E1E] p-2 rounded-full hover:bg-[#F4EFEA]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8A6345] font-semibold">
            <Video className="w-4 h-4" />
            <span>Стратегия контента для мастерской</span>
          </div>
          <h2 id="guide-title" className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
            Гайд: Какие Reels снимать, чтобы шли продажи?
          </h2>
          <p className="text-xs sm:text-sm text-[#665E54]">
            Пошаговые сценарии коротких видео, которые набирают сотни тысяч органических просмотров 
            и ведут покупателей прямо на этот одностраничник.
          </p>
        </div>

        {/* Golden Rules Callout */}
        <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E8E2D8] space-y-2 text-xs">
          <span className="font-bold text-[#1E1E1E] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8A6345]" />
            <span>Главная формула воронки Reels ➔ Продажи:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#665E54] pt-1">
            <div className="p-2.5 bg-white rounded border border-[#E8E2D8]">
              <strong className="text-[#1E1E1E] block">1. Хук (0-2 сек)</strong>
              Яркое действие: снятие формы с бетона, бросок ключей на магнит или капля масла.
            </div>
            <div className="p-2.5 bg-white rounded border border-[#E8E2D8]">
              <strong className="text-[#1E1E1E] block">2. Тактильный ASMR</strong>
              Громкий чистый звук: щелчок тумблера, звук шлифовки, стук о верстак.
            </div>
            <div className="p-2.5 bg-white rounded border border-[#E8E2D8]">
              <strong className="text-[#1E1E1E] block">3. Четкий призыв</strong>
              «Капсула из 4 предметов уже на сайте по ссылке в шапке профиля».
            </div>
          </div>
        </div>

        {/* 4 Detailed Scripts */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1E1E1E] uppercase tracking-wide">
            4 проверенных сценария для съемки:
          </h3>

          <div className="space-y-3">
            {CREATOR_GUIDE_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#E8E2D8] bg-white space-y-2 hover:border-[#D5CFC5] transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-[#8A6345] bg-[#F5EFE9] px-2 py-0.5 rounded-xs">
                    {tip.step}
                  </span>
                  <span className="text-[#7A7469] font-medium">Формат: 9:16 (вертикально)</span>
                </div>

                <h4 className="text-sm font-bold text-[#1E1E1E]">{tip.title}</h4>

                <div className="text-xs space-y-1.5 text-[#665E54]">
                  <p>
                    <strong className="text-[#1E1E1E]">Текст на первом кадре (хук):</strong>{' '}
                    <span className="italic">{tip.hook}</span>
                  </p>

                  <p>
                    <strong className="text-[#1E1E1E]">Аудиоряд:</strong> {tip.audioRecommendation}
                  </p>

                  <div>
                    <strong className="text-[#1E1E1E] block mb-1">Раскадровка (Shotlist):</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {tip.shotList.map((shot, sIdx) => (
                        <li key={sIdx}>{shot}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="pt-1 text-[#8A6345] bg-[#FAF8F5] p-2 rounded border border-[#E8E2D8]/60 text-[11px]">
                    <strong className="text-[#1E1E1E]">Что сказать в конце / написать в описании:</strong>{' '}
                    {tip.ctaCopy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio Link Setup */}
        <div className="p-4 rounded-lg bg-[#2C2B29] text-white text-xs space-y-2">
          <h4 className="font-bold text-sm text-[#FAF8F5]">
            Что написать в шапке профиля Instagram / TikTok?
          </h4>
          <p className="text-[#D8D2C7] leading-relaxed">
            🌿 Мастерская интерьерных объектов ручной работы<br />
            🪵 Массив кавказского дуба · Архитектурный бетон М600 · Сталь<br />
            📦 Отправка СДЭК по РФ за 24 часа<br />
            👇 Выбрать и заказать предмет из видео:
          </p>
          <div className="pt-1">
            <span className="inline-block bg-white/10 px-3 py-1.5 rounded font-mono text-emerald-400 text-xs">
              https://kraft-forma.ru (ссылка на этот сайт)
            </span>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            Понятно, закрыть гайд
          </button>
        </div>
      </div>
    </div>
  );
};
