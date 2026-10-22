import React, { useState } from 'react';
import { X, Zap, Send, MessageCircle } from 'lucide-react';
import { Product } from '../data/products.ts';
import { formatPrice, generateTelegramShareLink, generateWhatsAppShareLink } from '../utils/cart.ts';

interface QuickOrderModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderSuccess: (orderData: any) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  onClose,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  if (!product) return null;

  const handleSubmit = (channel: 'site' | 'telegram' | 'whatsapp') => {
    if (!name.trim()) {
      setError('Пожалуйста, укажите имя');
      return;
    }
    if (!contact.trim() || contact.length < 5) {
      setError('Укажите телефон или @telegram для подтверждения');
      return;
    }
    setError('');

    const orderNumber = `KF-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderText = `⚡ Быстрый заказ в 1 клик #${orderNumber}\n` +
      `Товар: ${product.name} (${product.materialCategory})\n` +
      `Стоимость: ${formatPrice(product.price)}\n\n` +
      `Клиент: ${name}\n` +
      `Контакт: ${contact}\n` +
      (city ? `Город: ${city}\n` : '');

    if (channel === 'telegram') {
      window.open(generateTelegramShareLink(orderText), '_blank');
    } else if (channel === 'whatsapp') {
      window.open(generateWhatsAppShareLink(orderText), '_blank');
    }

    onOrderSuccess({
      orderNumber,
      total: product.price,
      items: [{ ...product, quantity: 1, material: product.materialCategory }],
      delivery: { name, contact, city: city || 'Не указан', deliveryMethod: 'cdek_pvz' },
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-order-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-xl shadow-2xl border border-[#E8E2D8] p-6 space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 text-[#7A7469] hover:text-[#1E1E1E] p-1.5 rounded-full hover:bg-[#F4EFEA]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8A6345] font-semibold">
          <Zap className="w-4 h-4" />
          <span>Быстрый заказ за 30 секунд</span>
        </div>

        <div className="flex gap-3 items-center p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8]">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-cover rounded-md bg-[#E8E2D8] shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <h3 id="quick-order-title" className="text-sm font-bold text-[#1E1E1E] truncate">
              {product.name}
            </h3>
            <span className="text-xs text-[#7A7469] block">{product.materialCategory}</span>
            <span className="text-sm font-mono font-bold text-[#1E1E1E] tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[#6B655B] mb-1">Ваше имя *</label>
            <input
              type="text"
              placeholder="Как к вам обращаться?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
            />
          </div>

          <div>
            <label className="block text-[#6B655B] mb-1">
              Телефон или @Telegram для подтверждения *
            </label>
            <input
              type="text"
              placeholder="+7 (999) 000-00-00 или @username"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
            />
          </div>

          <div>
            <label className="block text-[#6B655B] mb-1">Город доставки (по желанию)</label>
            <input
              type="text"
              placeholder="Москва, СПб, Екатеринбург..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
            />
          </div>

          {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        </div>

        <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
          <button
            onClick={() => handleSubmit('telegram')}
            className="w-full py-3 px-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Подтвердить в Telegram (рекомендуем)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSubmit('site')}
              className="w-full py-2.5 px-3 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              Оформить на сайте
            </button>

            <button
              onClick={() => handleSubmit('whatsapp')}
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-[#8C8476]">
          Мастер свяжется в течение 15 минут для уточнения адреса СДЭК.
        </p>
      </div>
    </div>
  );
};
