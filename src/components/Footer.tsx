import React from 'react';
import { Send, Instagram, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReelsGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReelsGuide }) => {
  return (
    <footer className="bg-[#1E1E1E] text-[#D8D2C7] pt-14 pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <span className="w-2.5 h-2.5 bg-[#FAF8F5] rounded-xs inline-block"></span>
              <span>KRAFT & FORMA</span>
            </div>
            <p className="text-xs text-[#A8A196] max-w-sm leading-relaxed">
              Камерная мастерская интерьерных предметов ручной работы. 
              Массив дуба, архитектурный бетон М600 и вороненая сталь в скандинавском минимализме.
            </p>
            <div className="pt-2 text-[11px] text-[#7A7469]">
              Санкт-Петербург · Отправка заказов по всей России и СНГ через СДЭК
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              Навигация
            </span>
            <ul className="space-y-1.5 text-[#A8A196]">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Коллекция предметов
                </a>
              </li>
              <li>
                <a href="#reels" className="hover:text-white transition-colors">
                  Видео из мастерской (Reels)
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition-colors">
                  Бетон, дуб и сталь
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Доставка и гарантии
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReelsGuide}
                  className="hover:text-white text-[#D5B088] transition-colors text-left"
                >
                  Гайд по съемке Reels
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              Прямая связь с мастером
            </span>
            <p className="text-xs text-[#A8A196]">
              Отвечаем на любые вопросы по размерам, индивидуальным заказам и наличию:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://t.me/kraft_forma_workshop"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#2C2B29] hover:bg-[#383734] text-white rounded-md border border-[#44423E] transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#2AABEE]" />
                <span>Telegram @kraft_forma</span>
              </a>

              <a
                href="https://wa.me/79990000000"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#2C2B29] hover:bg-[#383734] text-white rounded-md border border-[#44423E] transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-[#2C2B29] hover:bg-[#383734] text-white rounded-md border border-[#44423E] transition-colors flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Reels & Stories</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#33312E] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7A7469] text-[11px]">
          <div>
            © {new Date().getFullYear()} KRAFT & FORMA. Все права защищены. Ручная работа в России.
          </div>
          <div className="flex items-center gap-1">
            <span>Создано с любовью к чистым фактурам</span>
            <Heart className="w-3 h-3 text-[#A8A196] fill-[#A8A196]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
