"use client";
import { useState } from 'react';

export default function Home() {
  const whatsappNumber = "218915044855"; 
  const siteUrl = "https://kazioni-store.vercel.app";
  
  const [dims, setDims] = useState({ length: '', width: '', height: '', qty: '1' });
  const [result, setResult] = useState<number | null>(null);
  const [copyMsg, setCopyMsg] = useState(false);
  
  // حالة التحكم في الصفحة (القائمة الرئيسية أو تفاصيل المنتج)
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
    const text = selectedProduct 
      ? `شاهد تفاصيل ${selectedProduct.name} عبر موقعنا` 
      : 'شاهد أحدث المنتجات واحسب شحنتك عبر موقعنا الرسمي';
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'الحاج كزيوني & Swivel', text: text, url: siteUrl });
      } catch (err) { copyToClipboard(); }
    } else { copyToClipboard(); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 3000);
  };

  // قائمة المنتجات مع التفاصيل الإضافية
  const products = [
    { 
      id: 1, 
      name: "لوحة مفاتيح للهواتف محمولة (للمتاجر)", 
      img: "/images/product1.jpg", 
      price: "30 $", 
      pColor: "text-amber-600",
      description: "لوحة مفاتيح احترافية مصممة خصيصاً لأصحاب المحلات والمتاجر، تدعم الربط السريع بالهاتف لتسهيل عمليات البيع والرد على الزبائن.",
      moq: "10 قطع"
    },
    { 
      id: 2, 
      name: "ماكينة تجفيف الفواكه بالتبريد", 
      img: "/images/product2.jpg", 
      price: "1850 $", 
      pColor: "text-amber-600",
      description: "أحدث تقنيات التجفيف بالتبريد (Freeze Drying) للحفاظ على القيمة الغذائية للفواكه. مثالية للمشاريع الغذائية الناشئة.",
      moq: "1 ماكينة"
    },
    { 
      id: 3, 
      name: "ماكينة صنع الفطيرة والتورتيلا", 
      img: "/images/product3.jpg", 
      price: "850 $", 
      pColor: "text-amber-600",
      description: "ماكينة آلية بالكامل لإنتاج الفطائر والتورتيلا بجودة عالية وسرعة فائقة، سهلة الاستخدام والتنظيف.",
      moq: "1 ماكينة"
    },
    { 
      id: 4, 
      name: "سلة القمامة الذكية 2026 ( للمتاجر )", 
      img: "/images/product4.jpg", 
      price: "50 $", 
      pColor: "text-amber-600",
      description: "سلة ذكية تعمل بالحساسات، تصميم عصري وأنيق يتناسب مع المكاتب والمحلات الكبرى، نظام إغلاق محكم لمنع الروائح.",
      moq: "5 قطع"
    }
  ];

  // واجهة تفاصيل المنتج
  if (selectedProduct) {
    return (
      <main className="min-h-screen bg-white text-right font-sans text-black pb-24" dir="rtl">
        <div className="relative h-80 bg-gray-100 flex items-center justify-center p-4">
          <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 bg-white/80 w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold z-10">✕</button>
          <img src={selectedProduct.img} className="max-h-full object-contain" />
        </div>
        
        <div className="p-6">
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full">منتج حصري 🇨🇳</span>
          <h2 className="text-2xl font-black mt-3 mb-2">{selectedProduct.name}</h2>
          <p className={"text-xl font-black mb-4 " + selectedProduct.pColor}>{selectedProduct.price}</p>
          
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-sm mb-2 text-blue-900 underline">تفاصيل المنتج:</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedProduct.description}</p>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400">أقل كمية للطلب (MOQ):</span>
              <span className="text-sm font-black text-red-600">{selectedProduct.moq}</span>
            </div>
          </div>

          <a href={"https://wa.me/" + whatsappNumber + "?text=استفسار عن " + selectedProduct.name} className="block w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-center shadow-lg active:scale-95 transition-all">
            تواصل للحجز والطلب الآن 💬
          </a>
        </div>

        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50">
          <button onClick={shareSite} className="w-full bg-black text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 border border-gray-700 text-sm">
            <span>📤</span> مشاركة رابط هذا المنتج
          </button>
        </div>
      </main>
    );
  }

  // الواجهة الرئيسية (الكتالوج)
  return (
    <main className="min-h-screen bg-gray-50 text-right font-sans text-black pb-32" dir="rtl">
      <nav className="bg-blue-900 text-white p-5 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black tracking-tighter">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">التجارة والشحن الدولي</p>
        </div>
      </nav>

      {/* قسم أسعار الشحن */}
      <section className="p-6 max-w-md mx-auto mt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-gray-800 border-r-4 border-blue-900 pr-3">أسعار الشحن 📦</h3>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full">أبريل 2026</span>
        </div>
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-3 text-white flex justify-between items-center">
            <h4 className="font-bold text-sm">✈️ الشحن الجوي</h4>
            <span className="text-[10px] bg-white/20 px-2 py-1 rounded-lg">9.25$ للكيلو</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-3 text-white flex justify-between items-center">
            <h4 className="font-bold text-sm">🚢 الشحن البحري</h4>
            <span className="text-[10px] bg-white/20 px-2 py-1 rounded-lg">158.5$ للـ CBM</span>
          </div>
        </div>
      </section>

      {/* حاسبة CBM */}
      <section className="p-6 max-w-md mx-auto pt-0">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-t-8 border-teal-700">
          <h3 className="text-lg font-black text-teal-800 mb-2 flex items-center">🧮 حاسبة الحجم (CBM)</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="number" value={dims.length} onChange={(e)=>setDims({...dims, length: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none" placeholder="الطول cm"/>
            <input type="number" value={dims.width} onChange={(e)=>setDims({...dims, width: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none" placeholder="العرض cm"/>
            <input type="number" value={dims.height} onChange={(e)=>setDims({...dims, height: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none" placeholder="الارتفاع cm"/>
            <input type="number" value={dims.qty} onChange={(e)=>setDims({...dims, qty: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none" placeholder="العدد"/>
          </div>
          <button onClick={calculateCBM} className="w-full bg-teal-700 text-white py-4 rounded-xl font-black shadow-lg">احسب الآن</button>
          {result !== null && <div className="mt-4 bg-teal-50 p-4 rounded-2xl text-center text-2xl font-black text-teal-900">{result} CBM</div>}
        </div>
      </section>

      {/* كتالوج المنتجات */}
      <section className="p-6 max-w-md mx-auto pt-2">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-orange-500 pr-3">وصل حديثاً 🇨🇳</h3>
        <p className="text-[10px] text-gray-400 mb-4">* اضغط على صورة المنتج لرؤية التفاصيل وأقل كمية للطلب.</p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="h-40 bg-gray-50 flex items-center justify-center p-2">
                <img src={product.img} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between text-center">
                <h4 className="font-bold text-[11px] text-black mb-1 leading-tight">{product.name}</h4>
                <p className={"font-black text-xs mb-2 " + product.pColor}>{product.price}</p>
                <button className="bg-gray-100 text-gray-800 text-[9px] py-1 rounded-md font-bold">التفاصيل ←</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50">
        {copyMsg && <div className="bg-black text-white text-[10px] py-2 px-4 rounded-full mb-2 text-center shadow-xl">تم نسخ الرابط! ✅</div>}
        <button onClick={shareSite} className="w-full bg-black text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2 border border-gray-700 text-sm text-white">
          <span>📤</span> مشاركة المتجر والأسعار
        </button>
      </div>
    </main>
  );
}
