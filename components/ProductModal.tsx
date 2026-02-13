
import React, { useState } from 'react';
import { X, Heart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L') => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');

  const sizes = {
    S: 'صغير',
    M: 'وسط',
    L: 'كبير'
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header Image Area */}
        <div className="relative h-72 md:h-80 bg-stone-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
          >
            <X size={20} />
          </button>
          <button className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
            <Heart size={20} />
          </button>
          
          <div className="absolute -bottom-1 bg-white w-full h-8 rounded-t-[2.5rem]" />
        </div>

        {/* Content */}
        <div className="p-8 pt-0 text-right">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-black text-[#4A3E30]">{product.name}</h2>
              <p className="text-xs text-stone-400 font-bold uppercase">{product.nameAr}</p>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse text-sm font-bold text-[#4A3E30]">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-sm text-stone-500 leading-relaxed my-4">
            {product.description}
          </p>

          <div className="mt-6">
            <h4 className="text-sm font-black text-[#4A3E30] mb-3">اختر الحجم</h4>
            <div className="flex space-x-4 space-x-reverse">
              {(['S', 'M', 'L'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                    selectedSize === size 
                      ? 'border-[#C19A6B] bg-[#FDFBF7] text-[#C19A6B]' 
                      : 'border-stone-100 text-stone-400 hover:border-stone-200'
                  }`}
                >
                  {sizes[size]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 font-bold">السعر الإجمالي</span>
              <div className="flex items-baseline space-x-1 space-x-reverse">
                <span className="text-2xl font-black text-[#4A3E30]">{product.price.toFixed(2)}</span>
                <span className="text-xs font-bold text-stone-400">ريال</span>
              </div>
            </div>
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="bg-[#C19A6B] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-[#C19A6B]/30 hover:bg-[#A68359] transition-all transform active:scale-95 text-sm"
            >
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
