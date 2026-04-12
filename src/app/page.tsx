"use client";
import { useState } from 'react';

export default function Home() {
  const whatsappNumber = "218915044855"; // تأكد من رقمك هنا
  
  // منطق الحاسبة
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

  const whatsappLink = "https://wa.me/" + whatsappNumber;

  return (
    <main className="min-h-screen bg-gray-50 text-right font-sans" dir="rtl">
      {/* الهيدر */}
      <nav className="bg-blue-900 text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-black tracking-tighter">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-blue-200 font-bold">للتجارة والشحن الدولي</p>
        </div>
      </nav>

      {/* حاسبة CBM الجديدة */}
      <section className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-blue-50">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <span className="ml-2">🧮</span> حاسبة الحجم (CBM)
          </h3>
          <p className="text-xs text-gray-500 mb-6">أدخل أبعاد الطرد بالسنتيمتر (cm) لحساب حجم الشحن.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">الطول (cm)</label>
              <input type="number" value={dims.length} onChange={(e)=>setDims({...dims, length: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">العرض (cm)</label>
              <input type="number" value={dims.width} onChange={(e)=>setDims({...dims, width: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">الارتفاع (cm)</label>
              <input type="number" value={dims.height} onChange={(e)=>setDims({...dims, height: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500" placeholder="0"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">العدد (القطع)</label>
              <input type="number" value={dims.qty} onChange={(e)=>setDims({...dims, qty: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500" placeholder="1"/>
            </div>
          </div>

          <button onClick={calculateCBM} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all mb-4">
            احسب الحجم الآن
          </button>

          {result !== null && (
            <div className="bg-orange-50 border-2 border-orange-100 p-4 rounded-2xl text-center">
              <span className="block text-xs text-orange-600 font-bold mb-1">إجمالي الحجم التقديري:</span>
              <span className="text-3xl font-black text-orange-700">{result} <small className="text-sm">CBM</small></span>
            </div>
          )}
        </div>
      </section>

      {/* قسم المنتج المميز */}
      <section className="px-6 pb-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex items-center p-3">
          <img src="/images/product1.jpg" className="w-20 h-20 object-contain rounded-xl bg-gray-50 ml-4" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">ولاعة ساعة فاخرة ✨</h4>
            <a href={whatsappLink} className="text-green-600 font-bold text-xs">اطلب الآن عبر واتساب ←</a>
          </div>
        </div>
      </section>

      {/* قسم الخدمات المختصر */}
      <section className="px-6 pb-10 max-w-md mx-auto grid grid-cols-2 gap-3">
         <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
            <span className="text-xl block mb-1">✈️</span>
            <span className="text-[10px] font-bold text-blue-900 uppercase">شحن جوي</span>
         </div>
         <div className="bg-green-50 p-4 rounded-2xl text-center border border-green-100">
            <span className="text-xl block mb-1">🚢</span>
            <span className="text-[10px] font-bold text-green-900 uppercase">شحن بحري</span>
         </div>
      </section>

      <footer className="py-8 text-center text-gray-400 text-[10px] bg-white border-t border-gray-100">
        <p>تصميم وتطوير: م. علي دخيل © 2026</p>
      </footer>
    </main>
  );
}
