
import { Product } from './types';

export const ZEKEA_COLORS = {
  primary: '#C19A6B',
  secondary: '#FF007F',
  accent: '#E0F7FA',
  background: '#FDFBF7',
  text: '#4A3E30'
};

export const MENU_ITEMS: Product[] = [
  {
    id: '1',
    name: 'كابتشينو ليت',
    nameAr: 'Cappuccino Lait',
    description: 'اسبريسو غني متوازن مع حليب مبخر ناعم وطبقة كثيفة من الرغوة الكريمية.',
    descriptionAr: 'Rich espresso balanced with silky steamed milk and a dense layer of foam.',
    price: 16.50,
    category: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    isPopular: true
  },
  {
    id: '2',
    name: 'زيكا سيجنتشر بارد',
    nameAr: 'Zeeka Signature Cold',
    description: 'مزيجنا السري من الحبوب المختصة والحليب العضوي، يقدم بارداً مع الثلج المنعش.',
    descriptionAr: 'Our secret blend of specialty beans and organic milk, served over crystal ice.',
    price: 18.00,
    originalPrice: 24.00,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1461023233037-930438186f91?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    isPopular: true,
    isOffer: true
  },
  {
    id: '3',
    name: 'آيس كوفي',
    nameAr: 'Ice Cold Coffee',
    description: 'مشروب محضّر من حبوب البن المحمصة، مبرد بعناية ليعطيك الانتعاش الذي تحتاجه.',
    descriptionAr: 'Brewed drink prepared from roasted coffee beans, chilled to perfection.',
    price: 12.00,
    category: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b56509d1?q=80&w=800&auto=format&fit=crop',
    rating: 4.5
  },
  {
    id: '4',
    name: 'سبانش لاتيه',
    nameAr: 'Spanish Latte',
    description: 'لاتيه حلو وكريمي مصنوع من الحليب المكثف والاسبريسو الفاخر.',
    descriptionAr: 'A sweet and creamy latte made with condensed milk and premium espresso.',
    price: 19.50,
    category: 'Latte',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    isPopular: true
  },
  {
    id: '5',
    name: 'ماتشا لاتيه',
    nameAr: 'Matcha Latte',
    description: 'ماتشا يابانية فاخرة مخفوقة بعناية مع اختيارك من الحليب الطازج.',
    descriptionAr: 'Ceremonial grade matcha whisked with your choice of milk.',
    price: 12.00,
    originalPrice: 22.00,
    category: 'Latte',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    isOffer: true
  },
  {
    id: '6',
    name: 'V60 مقطرة',
    nameAr: 'V60 Drip',
    description: 'حبوب قهوة أحادية المصدر محضرة بدقة باستخدام طريقة الترشيح V60.',
    descriptionAr: 'Single origin beans brewed using the precision V60 method.',
    price: 24.00,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: '7',
    name: 'فلات وايت',
    nameAr: 'Flat White',
    description: 'التوازن المثالي بين رغوة الميكرو المخملية وجرعة مزدوجة من الاسبريسو المركز.',
    descriptionAr: 'The perfect balance of velvety micro-foam and double shot espresso.',
    price: 17.00,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1551030173-1d2056c147dd?q=80&w=800&auto=format&fit=crop',
    rating: 4.8
  }
];
