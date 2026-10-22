import React, { useState } from 'react';
import { CheckCircle, Copy, Check, Send, ArrowRight } from 'lucide-react';
import { CartItem, DeliveryDetails, formatPrice } from '../utils/cart.ts';

interface OrderSuccessModalProps {
  orderData: {
    orderNumber: string;
    total: number;
    items: CartItem[];
    delivery: DeliveryDetails;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderData, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!orderData) return null;

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8A6345] font-semibold">
            Заказ успешно принят
          </span>
          <h2 id="success-title" className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
            Спасибо за ваш заказ!
          </h2>
          <p className="text-xs sm:text-sm text-[#665E54]">
            Мы бережно упакуем изделия в крафт и передадим в доставку СДЭК.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E8E2D8] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-[#7A7469] block">Номер вашего заказа:</span>
            <span className="font-mono text-base font-bold text-[#1E1E1E]">
              {orderData.orderNumber}
            </span>
          </div>
          <button
            onClick={handleCopyOrderNumber}
            className="px-3 py-1.5 text-xs font-medium text-[#2C2B29] hover:bg-[#EFEAE2] rounded-md border border-[#D5CFC5] transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать</span>
              </>
            )}
          </button>
        </div>

        {/* Itemized summary */}
        <div className="text-left text-xs space-y-2 p-3 bg-white rounded-lg border border-[#F0EBE3]">
          <div className="flex justify-between font-semibold text-[#1E1E1E] pb-1 border-b border-[#F0EBE3]">
            <span>Позиции:</span>
            <span className="font-mono tabular-nums">{formatPrice(orderData.total)}</span>
          </div>
          <ul className="space-y-1 text-[#665E54]">
            {orderData.items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-mono tabular-nums">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-[#F0EBE3] text-[11px] text-[#7A7469]">
            <span>Получатель: {orderData.delivery.name} ({orderData.delivery.contact})</span>
            <br />
            <span>Город: {orderData.delivery.city}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href="https://t.me/kraft_forma_workshop"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Написать мастеру в Telegram для вопросов</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            Вернуться в магазин
          </button>
        </div>
      </div>
    </div>
  );
};
