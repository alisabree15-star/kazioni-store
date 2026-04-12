"use client";
import { useState } from 'react';

export default function Home() {
  const whatsappNumber = "218915044855"; // تأكد من رقمك هنا
  const siteUrl = "https://kazioni-store.vercel.app";
  
  const [dims, setDims] = useState({ length: '', width: '', height: '', qty: '1' });
  const [result, setResult] = useState<number | null>(null);
  const [copyMsg, setCopyMsg] = useState(false);

  const calculateCBM = () => {
    const l = parseFloat(dims.length);
    const w = parseFloat(dims.width);
    const h = parseFloat(dims.height);
    const q = parseInt(dims.qty);
    if (l && w && h) {
      const cbm = (l * w * h * q) / 1000000;
      setResult(parseFloat(cbm.toFixed(3)));
    }
  };

  const shareSite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'الحاج كزيوني & Swivel',
          text: 'شاهد أحدث منتجاتنا واحسب حجم شحنتك عبر موقعنا الرسمي',
          url: siteUrl,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 3000);
  };

  const products = [
    { id: 1, name: "ولاعة ساعة فاخرة ✨", img: "/images/product1.jpg", price: "اتصل للسعر" },
    { id: 2, name: "منتج جديد 1 📦", img: "/images/product2.jpg", price: "قريباً" },
    { id: 3, name: "منتج جديد 2 🚢", img: "/images/product3.jpg", price: "قريباً" }
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-right font-sans text-black pb-32" dir="rtl">
      <nav className="bg-blue-900 text-white p-5 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black tracking-tighter">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">التجارة والشحن الدولي</p>
        </div>
      </nav>

      <section className="p-6 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-orange-500 pr-3">وصل حديثاً 🇨🇳</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
              <div className="h-40 bg-gray-50 flex items-center justify-center p-2">
                <img src={product.img} alt={product.name} className="max-h-full max-w-full object-contain" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=H.K+Store"; }}/>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between text-center">
                <h4 className="font-bold text-[11px] text-black mb-2">{product.name}</h4>
                <a href={"https://wa.me/" + whatsappNumber + "?text=استفسار عن " + product.name} className="bg-green-500 text-white text-[10px] py-2 rounded-lg font-bold">طلب واتساب</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* حاسبة CBM بخلفية بيضاء معدلة */}
      <section className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-t-8 border-blue-900">
          <h3 className="text-lg font-black text-blue-900 mb-4 flex items-center tracking-tight">
            <span className="ml-2 text-xl">🧮</span> حاسبة الحجم (CBM)
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="number" value={dims.length} onChange={(e)=>setDims({...dims, length: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="الطول cm"/>
            <input type="number" value={dims.width} onChange={(e)=>setDims({...dims, width: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="العرض cm"/>
            <input type="number" value={dims.height} onChange={(e)=>setDims({...dims, height: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="الارتفاع cm"/>
            <input type="number" value={dims.qty} onChange={(e)=>setDims({...dims, qty: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="العدد"/>
          </div>
          <button onClick={calculateCBM} className="w-full bg-blue-900 text-white py-4 rounded-xl font-black shadow-lg active:scale-95 transition-all">احسب الآن</button>
          
          {result !== null && (
            <div className="mt-4 bg-orange-50 border-2 border-orange-100 p-4 rounded-2xl text-center">
              <span className="block text-[10px] font-bold text-orange-600 mb-1">الحجم التقديري:</span>
              <span className="text-3xl font-black text-black">{result} CBM</span>
            </div>
          )}
        </div>
      </section>

      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50">
        {copyMsg && <div className="bg-black text-white text-[10px] py-2 px-4 rounded-full mb-2 text-center shadow-xl">تم نسخ الرابط! ✅</div>}
        <button onClick={shareSite} className="w-full bg-black text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 border border-gray-700 active:scale-95 transition-all text-sm">
          <span>📤</span> مشاركة المتجر
        </button>
      </div>
    </main>
  );
}
