import valetImg from '../assets/images/product_concrete_oak_valet_1792703706861.jpg';
import boardImg from '../assets/images/product_magnetic_board_1792703707927.jpg';
import lampImg from '../assets/images/product_steel_lamp_1792703707989.jpg';

export interface ReelItem {
  id: string;
  title: string;
  views: string;
  productId: string;
  productName: string;
  productPrice: number;
  duration: string;
  hookText: string;
  soundName: string;
  category: string;
  thumbnail: string;
  conceptDescription: string;
}

export const REELS_ITEMS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'ASMR распалубка бетона М600',
    views: '184.2K',
    productId: 'kontur-valet-tray',
    productName: 'Лоток-органайзер "KONTUR"',
    productPrice: 3400,
    duration: '0:14',
    hookText: '«Залипательный момент, когда бетон выходит из формы»',
    soundName: 'Оригинальный звук мастерской · ASMR',
    category: 'Бетон & Дуб',
    thumbnail: valetImg,
    conceptDescription: 'Снятие гибкой силиконовой формы, глухой стук монолита о верстак и идеальная шелковистая геометрия.',
  },
  {
    id: 'reel-2',
    title: 'Магия натурального масла на дубе',
    views: '312.8K',
    productId: 'magnet-keyholder',
    productName: 'Магнитная ключница "MAGNET"',
    productPrice: 4200,
    duration: '0:18',
    hookText: '«Секунда, когда дерево оживает под воском»',
    soundName: 'Lo-Fi Chill Beats · Craft Studio',
    category: 'Массив дуба',
    thumbnail: boardImg,
    conceptDescription: 'Шлифовка зерном P320 и проявление глубокого рисунка волокон кавказского дуба под маслом Osmo.',
  },
  {
    id: 'reel-3',
    title: 'Тест неодимовых магнитов связкой ключей',
    views: '241.5K',
    productId: 'magnet-keyholder',
    productName: 'Магнитная ключница "MAGNET"',
    productPrice: 4200,
    duration: '0:11',
    hookText: '«Выдержит ли связку из 9 ключей и брелока от машины?»',
    soundName: 'Тактильный щелчок · Satisfying Clack',
    category: 'Сталь & Дуб',
    thumbnail: boardImg,
    conceptDescription: 'Бросок ключей с 15 см к поверхности — чистый глубокий щелчок и мертвое удержание.',
  },
  {
    id: 'reel-4',
    title: 'Вечерний уют и щелчок латунного тумблера',
    views: '98.3K',
    productId: 'lumen-concrete-lamp',
    productName: 'Настольная лампа "LUMEN"',
    productPrice: 6800,
    duration: '0:16',
    hookText: '«Когда выключаешь весь свет в комнате и оставляешь только ее»',
    soundName: 'Vintage Click · Warm Light ASMR',
    category: 'Бетон & Латунь',
    thumbnail: lampImg,
    conceptDescription: 'Камера фокусируется на латунном тумблере, щелчок пальцем, спираль накаливания тепло заливает комнату.',
  },
];

export interface CreatorGuideTip {
  step: string;
  title: string;
  hook: string;
  audioRecommendation: string;
  shotList: string[];
  ctaCopy: string;
}

export const CREATOR_GUIDE_TIPS: CreatorGuideTip[] = [
  {
    step: 'Сценарий 01',
    title: 'ASMR Процесс: Распалубка или заливка бетона',
    hook: '«Почему многие боятся бетона в квартире? А вы потрогайте эту текстуру...»',
    audioRecommendation: 'Чистый живой звук мастерской (без фоновой музыки или на 10% тихий lo-fi). Звук шпателя, вибростола, глухой стук формы.',
    shotList: [
      '0-2 сек: Резкий крупный план — отгибание силиконовой формы от угла бетона.',
      '3-7 сек: Движение руки по матовой поверхности (тактильность).',
      '8-12 сек: Установка на дубовую подставку и укладка ключей/часов.',
    ],
    ctaCopy: '«Заказать предмет ручной работы можно по ссылке в шапке профиля — отправляем СДЭК за 24 часа».',
  },
  {
    step: 'Сценарий 02',
    title: 'Трансформация «До / После масла»',
    hook: '«Секунда, ради которой я столярю уже третий год...»',
    audioRecommendation: 'Трендовый аудиоряд с дропом в момент касания кисти или губки с маслом.',
    shotList: [
      '0-3 сек: Блеклый шлифованный дуб, сухая поверхность.',
      '3-8 сек: Одним непрерывным движением губка с маслом наносит полосу — моментальный контраст и янтарная глубина.',
      '9-15 сек: Готовый предмет в стильном минималистичном интерьере с чашкой кофе.',
    ],
    ctaCopy: '«Осталось 4 лотка в наличии. Ссылка на сайт в описании профиля».',
  },
  {
    step: 'Сценарий 03',
    title: '«Беспорядок vs Минимализм» (Решение боли)',
    hook: '«Куда ты бросаешь ключи, наушники и кольца, когда приходишь домой?»',
    audioRecommendation: 'Динамичный современный бит с паузой на моменте порядка.',
    shotList: [
      '0-3 сек: Разбросанные по тумбочке мелочи, чеки, ключи.',
      '3-7 сек: Рука убирает хаос и ставит один монолитный лоток из бетона и дуба.',
      '8-12 сек: Мелочи аккуратно ложатся в углубления. Стол выглядит как в Pinterest.',
    ],
    ctaCopy: '«Собери порядок на прихожей. Ссылка на магазин с ценами в био».',
  },
  {
    step: 'Сценарий 04',
    title: 'Звуковой хук «Тактильный тест»',
    hook: '«Если ты любишь звук качественных вещей, послушай это в наушниках 🎧»',
    audioRecommendation: 'Максимально усиленный микрофон (gain +6dB), чистые микрошумы.',
    shotList: [
      '0-3 сек: Щелчок латунного тумблера светильника.',
      '4-7 сек: Магнитный "клац" связки ключей к дубовой планке.',
      '8-12 сек: Стук тяжелого бетонного костера о дубовую столешницу.',
    ],
    ctaCopy: '«Все предметы изготовлены вручную в нашей мастерской. Ссылка на сайт в шапке».',
  },
];
