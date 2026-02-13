
import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen }) => {
  return (
    <div 
      onClick={() => onOpen(product)}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full relative"
    >
      <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1 space-x-reverse text-xs">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span>{product.rating}</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-[#4A3E30] text-sm md:text-base leading-tight">
          {product.name}
        </h3>
        <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">متوفر بحليب الشوفان</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-baseline space-x-1 space-x-reverse">
          <span className="font-black text-[#4A3E30] text-base">
            {product.price.toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-stone-400">ريال</span>
        </div>
        <button className="bg-[#C19A6B] text-white p-1.5 rounded-xl hover:bg-[#A68359] transition-colors">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
