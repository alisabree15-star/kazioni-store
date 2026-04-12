"use client";
import { useState } from 'react';

export default function Home() {
  const whatsappNumber = "218915044855"; // تأكد من رقمك هنا
  
  const [dims, setDims] = useState({ length: '', width: '', height: '', qty: '1' });
  const [result, setResult] = useState<number | null>(null);

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

  const shareSite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'الحاج كزيوني & Swivel',
        text: 'احسب حجم شحنتك وشاهد أحدث المنتجات من الصين عبر متجر الحاج كزيوني',
        url: 'https://kazioni-store.vercel.app',
      });
    }
  };

  const whatsappLink = "https://wa.me/" + whatsappNumber;

  return (
    <main className="min-h-screen bg-gray-50 text-right font-sans text-black pb-20" dir="rtl">
      <nav className="bg-blue-900 text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-black tracking-tighter text-white">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-blue-200 font-bold">للتجارة والشحن الدولي</p>
        </div>
      </nav>

      <section className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-blue-50">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <span className="ml-2">🧮</span> حاسبة الحجم (CBM)
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">الطول (cm)</label>
              <input type="number" value={dims.length} onChange={(e)=>setDims({...dims, length: e.target.value})} 
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-center text-black font-bold" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">العرض (cm)</label>
              <input type="number" value={dims.width} onChange={(e)=>setDims({...dims, width: e.target.value})} 
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-center text-black font-bold" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">الارتفاع (cm)</label>
              <input type="number" value={dims.height} onChange={(e)=>setDims({...dims, height: e.target.value})} 
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-center text-black font-bold" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">العدد</label>
              <input type="number" value={dims.qty} onChange={(e)=>setDims({...dims, qty: e.target.value})} 
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-center text-black font-bold" placeholder="1"/>
            </div>
          </div>

          <button onClick={calculateCBM} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all mb-4">
            احسب الحجم الآن
          </button>

          {result !== null && (
            <div className="bg-orange-100 border-2 border-orange-200 p-4 rounded-2xl text-center">
              <span className="block text-xs text-orange-800 font-bold mb-1">إجمالي الحجم:</span>
              <span className="text-4xl font-black text-black">{result} <small className="text-sm text-black">CBM</small></span>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex items-center p-3">
          <img src="/images/product1.jpg" className="w-16 h-16 object-contain rounded-xl bg-gray-50 ml-4" />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-black">ولاعة ساعة فاخرة ✨</h4>
            <a href={whatsappLink} className="text-green-700 font-bold text-xs underline">اطلب عبر واتساب ←</a>
          </div>
        </div>
      </section>

      {/* زر المشاركة الجديد */}
      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50">
        <button onClick={shareSite} className="w-full bg-black text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border border-gray-700">
          <span>📤</span> مشاركة الموقع مع التجار
        </button>
      </div>

      <footer className="py-20 text-center text-gray-500 text-[10px] bg-white border-t border-gray-100">
        <p className="font-bold text-black italic">تصميم وتطوير: م. علي دخيل© 2026</p>
      </footer>
    </main>
  );
}
