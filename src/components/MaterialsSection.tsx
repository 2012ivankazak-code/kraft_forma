import React from 'react';
import { Hammer, Droplets, Mountain } from 'lucide-react';

export const MaterialsSection: React.FC = () => {
  const materials = [
    {
      icon: Mountain,
      title: 'Архитектурный бетон М600',
      subtitle: 'Монолит, прохлада и шелковистая матовость',
      description:
        'Используем мелкозернистый архитектурный состав с гидрофобными добавками. Изделие проходит вакуумирование и виброуплотнение — в бетоне остаются только естественные благородные каверны. Он не осыпается, не пылит и отталкивает влагу.',
      specs: ['Прочность М600 (выдерживает падения)', 'Глубокая гидрофобная пропитка', 'Вес дает устойчивость на столе'],
    },
    {
      icon: Droplets,
      title: 'Массив кавказского дуба',
      subtitle: 'Тепло натурального дерева и вековые кольца',
      description:
        'Цельный кавказский дуб радиального и тангенциального распила. Никакого шпона или МДФ. Каждая деталь шлифуется вручную до зерна P320 и пропитывается натуральным немецким маслом Osmo с твердым воском карнаубы.',
      specs: ['Камерная сушка 8% влажности', 'Эко-масло безопасно при контакте с едой', 'Со временем приобретает благородную патину'],
    },
    {
      icon: Hammer,
      title: 'Вороненая сталь и латунь',
      subtitle: 'Лаконичный индустриальный контраст',
      description:
        'Горячекатаная листовая сталь и бесшовные трубы с матовым химическим воронением или порошковым муаровым напылением. Акценты из цельной точеной латуни добавляют теплого блеска и премиального звучания.',
      specs: ['Защита от коррозии и царапин', 'Неодимовые магниты N52', 'Настоящие латунные тумблеры'],
    },
  ];

  return (
    <section id="materials" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7C756B] font-medium block mb-2">
            Философия мастерской
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            Три материала. Ноль компромиссов.
          </h2>
          <p className="text-sm sm:text-base text-[#686257] mt-2 leading-relaxed">
            Мы объединили три древнейших стихии: холодный камень, живое дерево и твердый металл. 
            Каждый предмет приятно держать в руках — он обладает весом, текстурой и настоящей душой.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((mat, idx) => {
            const Icon = mat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5CFC5] transition-all hover:shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] text-[#2C2B29] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1E1E]">{mat.title}</h3>
                  <span className="text-xs text-[#8A6345] font-medium block mt-0.5 mb-3">
                    {mat.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-[#665E54] leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F0EBE3]">
                  <ul className="space-y-1.5 text-xs text-[#7A7469]">
                    {mat.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A6345] shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
