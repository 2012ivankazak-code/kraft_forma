import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Package, ShieldCheck, Clock, RefreshCw } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Как доставляются изделия — не разобьется ли бетон в пути?',
      a: 'Мы упаковываем каждое изделие по музейному стандарту: внутренний слой плотной крафтовой бумаги, демпферные вкладыши из прессованного картона и толстый пятислойный гофрокороб. Все посылки СДЭК застрахованы на полную стоимость. Если при доставке что-то повредится — мы бесплатно и без лишних вопросов отправим новое изделие.',
    },
    {
      q: 'Не царапает ли бетон мебель и оставляет ли пыль?',
      a: 'Категорически нет. Наш бетон — это не сырой строительный раствор, а плотный виброуплотненный архитектурный камень марки М600. Он дважды пропитывается водоотталкивающим грунтом глубокого проникновения. На основание каждого изделия наклеены ножки из натуральной португальской пробки или мягкого силикона, поэтому ваши столы в полной безопасности.',
    },
    {
      q: 'Как ухаживать за массивом дуба и бетоном?',
      a: 'Все предельно просто: протирайте изделия сухой или слегка влажной мягкой тканью (микрофибра). Дуб покрыт экологичным немецким маслом Osmo с воском карнаубы — оно защищает волокна от брызг чая или кофе. Не используйте хлорсодержащие или агрессивные абразивные чистящие средства.',
    },
    {
      q: 'Можно ли сделать гравировку или брендирование для подарка?',
      a: 'Да! Мы можем нанести лазерную гравировку на деревянную часть, сделать тиснение на латунной пластине или упаковать в подарочную коробку с сургучной печатью и вашей открыткой. Напишите нам в Telegram после заказа или укажите в комментарии.',
    },
    {
      q: 'Сколько времени занимает доставка?',
      a: 'Позиции со статусом «В наличии» передаются в СДЭК в течение 24 часов. Доставка в Москву и Санкт-Петербург занимает 1–2 рабочих дня, в другие города России — 2–5 дней. При заказе от 5 000 ₽ доставка до ПВЗ за наш счет.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#7C756B] font-medium block mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Вопросы и ответы</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            Доставка, уход и гарантия
          </h2>
          <p className="text-sm text-[#686257] mt-1">
            Все, что нужно знать перед заказом интерьерных предметов ручной работы.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#E8E2D8] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#1E1E1E]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A7469] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1E1E1E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#554F46] leading-relaxed border-t border-[#F0EBE3] pt-4 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
