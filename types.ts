
export type Category = 'Latte' | 'Espresso' | 'Cappuccino' | 'Cold Brew' | 'Signature';
export type ViewState = 'home' | 'menu' | 'offers' | 'about';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  rating: number;
  isPopular?: boolean;
  isOffer?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: 'S' | 'M' | 'L';
}
