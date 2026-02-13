
import React, { useState, useMemo } from 'react';
import { Search, Menu as MenuIcon, ShoppingCart, MapPin, ExternalLink, Star, ArrowLeft, Instagram, Twitter, Home as HomeIcon, Coffee, Percent, Info } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { MENU_ITEMS, ZEKEA_COLORS } from './constants';
import { Category, Product, CartItem, ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('Latte');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoriesMap: Record<string, string> = {
    'Latte': 'لاتيه',
    'Espresso': 'اسبريسو',
    'Cappuccino': 'كابتشينو',
    'Cold Brew': 'كولد برو',
    'Signature': 'المشروبات الخاصة'
  };

  const filteredProducts = useMemo(() => {
    return MENU_ITEMS.filter(item => 
      item.category === activeCategory && 
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [activeCategory, searchQuery]);

  const offers = useMemo(() => MENU_ITEMS.filter(item => item.isOffer), []);
  const popularProducts = useMemo(() => MENU_ITEMS.filter(item => item.isPopular), []);

  const handleAddToCart = (product: Product, size: 'S' | 'M' | 'L') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setSelectedProduct(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Featured Hero Card */}
            <div className="bg-[#E0F7FA] rounded-[3rem] p-10 md:p-14 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center">
              <div className="relative z-10 flex-1 text-right">
                <span className="bg-[#FF007F] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                  جديدنا
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-[#4A3E30] leading-tight mb-6">
                  اكتشف <br/> <span className="text-[#FF007F]">سحر زيكا</span>
                </h2>
                <p className="text-[#00838F]/70 text-lg mb-8 max-w-sm leading-relaxed">
                  استمتع بأفضل قهوة مختصة عضوية في الرياض. حبوب مختارة بعناية، محمصة بإتقان.
                </p>
                <button 
                  onClick={() => setCurrentView('menu')}
                  className="bg-[#4A3E30] text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 space-x-reverse hover:bg-black transition-all group"
                >
                  <span>استعرض القائمة</span>
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex-1 mt-10 md:mt-0 relative flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl overflow-hidden border-8 border-white group cursor-pointer" onClick={() => setCurrentView('menu')}>
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800" alt="Specialty" className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" />
                </div>
              </div>
            </div>

            {/* Popular Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-[#4A3E30]">المشروبات المميزة</h3>
                <button onClick={() => setCurrentView('menu')} className="text-[#C19A6B] font-bold text-sm flex items-center space-x-2 space-x-reverse">
                  <span>مشاهدة الكل</span>
                  <ArrowLeft size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {popularProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onOpen={(p) => setSelectedProduct(p)} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Category Selector */}
            <div className="flex space-x-4 space-x-reverse mb-10 overflow-x-auto pb-4 custom-scrollbar">
              {['Latte', 'Espresso', 'Cappuccino', 'Cold Brew', 'Signature'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-8 py-4 rounded-2xl whitespace-nowrap font-bold transition-all text-sm ${
                    activeCategory === cat 
                      ? 'bg-[#C19A6B] text-white shadow-lg shadow-[#C19A6B]/30' 
                      : 'bg-white text-stone-400 hover:bg-stone-50'
                  }`}
                >
                  {categoriesMap[cat]}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onOpen={(p) => setSelectedProduct(p)} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-stone-300 italic font-medium">
                  لا توجد منتجات في هذا القسم حالياً...
                </div>
              )}
            </div>
          </div>
        );

      case 'offers':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-[#FF007F] rounded-[3rem] p-12 mb-12 text-white relative overflow-hidden text-right">
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-4">عروض حصرية</h2>
                <p className="text-white/80 max-w-sm mb-0">عروض لفترة محدودة على مشروباتكم المفضلة. اطلبها الآن!</p>
              </div>
              <div className="absolute top-0 left-0 p-12 opacity-20">
                <Percent size={120} strokeWidth={3} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map(product => (
                <div key={product.id} className="group relative">
                  <ProductCard product={product} onOpen={(p) => setSelectedProduct(p)} />
                  {product.originalPrice && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-[#FF007F] font-black text-[10px] z-10">
                      وفر {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto text-right">
            <div className="relative h-96 rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200" className="w-full h-full object-cover" alt="Zeeka Interior" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                <div>
                  <h2 className="text-white text-5xl font-black mb-2">قصتنا</h2>
                  <p className="text-white/70 font-medium">نصنع التميز منذ عام 2023 في قلب الرياض.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-black text-[#4A3E30] mb-6">الجودة أولاً</h3>
                <p className="text-stone-500 leading-relaxed mb-6">
                  في زيكا، نؤمن أن القهوة ليست مجرد مشروب؛ بل هي تجربة. نحن نستورد حبوب البن العضوية 100٪ من مزارع مستدامة في إثيوبيا وكولومبيا والبرازيل.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  البارستا لدينا فنانون، مدربون على استخراج النكهات الفريدة لكل حبة بن، سواء من خلال ترشيح V60 الدقيق أو الفلات وايت المخملي.
                </p>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100">
                <h3 className="text-xl font-black text-[#4A3E30] mb-6">تفضل بزيارتنا</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="p-3 bg-[#E0F7FA] text-[#00838F] rounded-xl">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#4A3E30]">الموقع</p>
                      <p className="text-sm text-stone-500">حي الصحافة، الرياض 13321، المملكة العربية السعودية</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="p-3 bg-[#FDFBF7] text-[#C19A6B] rounded-xl border border-stone-100">
                      <Star size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#4A3E30]">ساعات العمل</p>
                      <p className="text-sm text-stone-500">مفتوح يومياً: 7:00 صباحاً - 12:00 منتصف الليل</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://maps.app.goo.gl/2TRCRR5T6rBK84ht8', '_blank')}
                    className="w-full mt-4 bg-[#C19A6B] text-white py-4 rounded-2xl font-black flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <span>احصل على الاتجاهات</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 space-x-reverse pb-12">
              <a href="#" className="p-4 bg-white rounded-2xl text-[#4A3E30] hover:text-[#FF007F] transition-all shadow-sm border border-stone-100"><Instagram size={24} /></a>
              <a href="#" className="p-4 bg-white rounded-2xl text-[#4A3E30] hover:text-[#00ACEE] transition-all shadow-sm border border-stone-100"><Twitter size={24} /></a>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-xl px-6 py-8 md:px-12">
        <div className="flex items-center justify-between mb-10 max-w-6xl mx-auto">
          <div className="p-3 bg-stone-100 rounded-2xl md:hidden">
            <MenuIcon size={20} className="text-[#4A3E30]" />
          </div>
          
          <div className="text-center md:text-right flex-1 md:flex-none mx-4 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="flex items-center justify-center md:justify-start space-x-2 space-x-reverse mb-1">
              <div className="w-10 h-10 rounded-full bg-[#FF007F] flex items-center justify-center shadow-lg shadow-[#FF007F]/20">
                <span className="text-white font-black text-sm">Z</span>
              </div>
              <h1 className="text-2xl font-black text-[#4A3E30] tracking-tighter">زيكا</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            {currentView === 'menu' && (
              <div className="hidden md:flex relative group w-64 mr-4">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#C19A6B] transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="ابحث في المنيو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-100 rounded-2xl py-3 pr-11 pl-4 text-xs outline-none focus:ring-2 focus:ring-[#C19A6B]/20 transition-all text-right"
                />
              </div>
            )}
            
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-3.5 bg-white shadow-md border border-stone-50 rounded-2xl relative transition-transform active:scale-90"
            >
              <ShoppingCart size={22} className="text-[#4A3E30]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-[#FF007F] text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black shadow-lg shadow-[#FF007F]/30 animate-in zoom-in">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {currentView !== 'home' && (
          <div className="max-w-6xl mx-auto mb-4 animate-in fade-in slide-in-from-right-2 duration-300 text-right">
            <p className="text-[#C19A6B] text-[10px] font-black uppercase tracking-widest mb-1">
              {currentView === 'menu' ? 'القائمة المختصة' : currentView === 'offers' ? 'عروض اليوم' : 'قصة زيكا'}
            </p>
            <h2 className="text-3xl font-black text-[#4A3E30]">
              {currentView === 'menu' ? 'منيو زيكا' : currentView === 'offers' ? 'أفضل العروض' : 'عن زيكا كافيه'}
            </h2>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 flex">
        {/* Vertical Sidebar Navigation */}
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

        {/* Current View Container */}
        <div className="flex-1 md:mr-24">
          {renderView()}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-start">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-10 flex flex-col animate-in slide-in-from-left duration-500 rounded-r-[3rem] text-right">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-[#4A3E30]">سلتك</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-3 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-colors">
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pl-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-300">
                  <div className="w-24 h-24 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="font-black text-lg">السلة فارغة؟</p>
                  <p className="text-sm">حان وقت بعض الكافيين!</p>
                  <button onClick={() => {setIsCartOpen(false); setCurrentView('menu');}} className="mt-8 text-[#FF007F] font-black text-sm uppercase tracking-widest">تسوق الآن</button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-5 space-x-reverse p-5 rounded-[2rem] bg-[#FDFBF7] border border-stone-50 group hover:shadow-md transition-all">
                    <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#4A3E30]">{item.name}</h4>
                      <p className="text-[10px] text-[#C19A6B] font-black uppercase mt-1">الحجم: {item.selectedSize === 'S' ? 'صغير' : item.selectedSize === 'M' ? 'وسط' : 'كبير'}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline space-x-1 space-x-reverse">
                          <span className="font-black text-[#4A3E30]">{(item.price * item.quantity).toFixed(2)}</span>
                          <span className="text-[10px] font-bold text-stone-400">ريال</span>
                        </div>
                        <div className="flex items-center bg-white rounded-xl border border-stone-100 px-3 py-1">
                          <span className="text-xs font-black text-stone-400">الكمية: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-10 border-t border-stone-100 mt-auto">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">المجموع الفرعي</span>
                  <div className="flex items-baseline space-x-1 space-x-reverse">
                    <span className="text-3xl font-black text-[#4A3E30]">{cartTotal.toFixed(2)}</span>
                    <span className="text-sm font-bold text-stone-400">ريال</span>
                  </div>
                </div>
                <button className="w-full bg-[#FF007F] text-white py-6 rounded-[2rem] font-black shadow-2xl shadow-[#FF007F]/30 hover:bg-[#D4006A] transition-all transform active:scale-[0.98] uppercase tracking-widest">
                  إتمام الطلب
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />
      
      {/* Mobile Sticky Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-40 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-stone-100 flex justify-around p-4">
        {[
          {id: 'home', icon: HomeIcon},
          {id: 'menu', icon: Coffee},
          {id: 'offers', icon: Percent},
          {id: 'about', icon: Info}
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewState)}
            className={`p-3 rounded-2xl transition-all ${currentView === item.id ? 'bg-[#FF007F] text-white shadow-lg' : 'text-stone-400'}`}
          >
            <item.icon size={22} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
