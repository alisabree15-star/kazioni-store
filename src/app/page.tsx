"use client";
import { useState } from 'react';

export default function Home() {
  const whatsappNumber = "218915044855"; // رقم المبيعات والشحن
  const transfersWhatsapp = "218913489000"; // رقم الحوالات المالية (USDT)
  const siteUrl = "https://kazioni-store.vercel.app";
  
  const [dims, setDims] = useState({ length: '', width: '', height: '', qty: '1' });
  const [result, setResult] = useState<number | null>(null);
  const [copyMsg, setCopyMsg] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productQty, setProductQty] = useState(1);
  
  const [isAirOpen, setIsAirOpen] = useState(false);
  const [isSeaOpen, setIsSeaOpen] = useState(false);

  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    const text = 'شاهد أحدث المنتجات واحسب شحنتك عبر موقع الحاج كزيوني الرسمي';
    if (navigator.share) {
      try { await navigator.share({ title: 'الحاج كزيوني & Swivel', text: text, url: siteUrl }); } 
      catch (err) { copyToClipboard(); }
    } else { copyToClipboard(); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 3000);
  };

  const parseNum = (str: string) => {
    const val = parseFloat(str);
    return isNaN(val) ? 0 : val;
  };

  const addToCart = (product: any, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateCartItemQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + (parseNum(item.price) * item.qty), 0);
  const cartTotalCBM = cart.reduce((acc, item) => acc + (parseNum(item.cbm) * item.qty), 0);
  const cartTotalWeight = cart.reduce((acc, item) => acc + (parseNum(item.weight) * item.qty), 0);

  const checkoutWhatsApp = () => {
    let msg = "مرحباً الحاج كزيوني، أرغب في طلب المنتجات التالية:\n\n";
    cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.name}*\n`;
      msg += `- الكمية: ${item.qty}\n`;
      msg += `- السعر: ${item.price === 'تواصل للسعر' ? 'يحدد لاحقاً' : (parseNum(item.price) * item.qty) + ' $'} \n`;
      msg += `-------------------\n`;
    });
    msg += `\n*📦 ملخص الطلب:*\n`;
    msg += `🔹 الإجمالي (تقريبي): ${cartTotalPrice} $\n`;
    msg += `🔹 الحجم الإجمالي: ${cartTotalCBM.toFixed(3)} CBM\n`;
    msg += `🔹 الوزن الإجمالي: ${cartTotalWeight.toFixed(2)} KG\n\n`;
    msg += "الرجاء تأكيد الطلب وحساب تكلفة الشحن النهائية. شكراً لك.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // دالة الحوالات المالية المخصصة
  const handleTransferClick = (countryName: string, flag: string) => {
    const msg = `مرحباً مؤسسة الحاج كزيوني، أرغب في الاستفسار عن أسعار الصرف اليومية وإرسال حوالة مالية إلى ${countryName} ${flag}.`;
    const url = `https://wa.me/${transfersWhatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const products = [
    { id: 1, name: "لوحة مفاتيح للهواتف محمولة (للمتاجر)", img: "/images/product1.jpg", price: "30 $", pColor: "text-amber-600", shippingNote: "السعر لا يشمل الشحن", description: "لوحة مفاتيح احترافية مصممة للهواتف، تدعم الربط السريع لتسهيل عمليات البيع والرد على الزبائن.", moq: "10 قطع", cbm: "0.002", weight: "0.3" },
    { id: 2, name: "ماكينة تجفيف الفواكه بالتبريد", img: "/images/product2.jpg", price: "1850 $", pColor: "text-amber-600", shippingNote: "متوفر شحن بحري فقط (شامل الشحن والعمولة)", description: "أحدث تقنيات التجفيف بالتبريد للحفاظ على القيمة الغذائية للفواكه. مثالية للمشاريع الغذائية الناشئة.", moq: "1 ماكينة", cbm: "0.680", weight: "80" },
    { id: 3, name: "ماكينة صنع الفطيرة والتورتيلا", img: "/images/product3.jpg", price: "850 $", pColor: "text-amber-600", shippingNote: "متوفر شحن بحري فقط (شامل الشحن والعمولة)", description: "ماكينة آلية بالكامل لإنتاج الفطائر والتورتيلا بجودة عالية وسرعة فائقة، سهلة الاستخدام والتنظيف.", moq: "1 ماكينة", cbm: "0.130", weight: "60" },
    { id: 4, name: "سلة القمامة الذكية 2026 ( للمتاجر )", img: "/images/product4.jpg", price: "50 $", pColor: "text-amber-600", shippingNote: "السعر لا يشمل الشحن", description: "سلة ذكية تعمل بالحساسات، تصميم عصري وأنيق يتناسب مع المكاتب والمحلات الكبرى، نظام إغلاق محكم لمنع الروائح.", moq: "10 قطع", cbm: "0.090", weight: "4" },
    { id: 5, name: "ماكينه طباعه حراريه محموله ✨", img: "/images/product5.jpg", price: "75 $", pColor: "text-amber-600", shippingNote: "السعر لا يشمل الشحن", description: "ماكينة حرارية متطورة متعددة الاستخدامات، دقة عالية في الأداء وكفاءة في استهلاك الطاقة.", moq: "10 قطع", cbm: "0.150", weight: "23" },
    { id: 6, name: "الة عصر البرتقال والفواكه ( للمتاجر )", img: "/images/product6.jpg", price: "25 $", pColor: "text-amber-600", shippingNote: "السعر لا يشمل الشحن", description: "آلة عصر احترافية وعملية، مصممة لتحمل الاستخدام المستمر في المتاجر والمقاهي. تضمن استخلاص العصير بسرعة وكفاءة عالية.", moq: "10 قطع", cbm: "0.025", weight: "5.5" },
    { id: 7, name: "ماكينة بيتزا موديل 2025 🔥", img: "/images/product7.jpg", price: "430 $", pColor: "text-amber-600", shippingNote: "السعر شامل الشحن والعمولة (شحن جوي سريع ✈️)", description: "ماكينة بيتزا تجارية حديثة، مصممة خصيصاً للمطاعم والمقاهي. توفر توزيعاً حرارياً متساوياً لخبز مثالي وسريع.", moq: "1 قطعة", cbm: "0.150", weight: "35" },
    { id: 8, name: "ماكينة التنظيف بالثلج الجاف 👀", img: "/images/product8.jpg", price: "1400 $", pColor: "text-amber-600", shippingNote: "شامل الشحن والعمولة إلى ليبيا (شحن بحري فقط 🚢)", description: "ماكينة تنظيف صناعية متطورة بتقنية الثلج الجاف (Dry Ice Blasting) من Crodium. حل مثالي لتنظيف المحركات وإزالة الشحوم الكربونية.", moq: "1 قطعة", cbm: "0.450", weight: "75" },
    { id: 10, name: "آلة صنع المثلجات (جيلاطي المفترش ❤️)", img: "/images/product10.jpg", price: "400 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "أبهر زبائنك بعروض الآيس كريم المقلي (جيلاطي المفترش) الطازجة والمبتكرة. تتميز هذه الآلة المكتبية المدمجة بسطح تجميد مسطح ومصقول من الستانلس ستيل.", moq: "1 قطعة", cbm: "0.100", weight: "25" },
    { id: 11, name: "كرسي تدليك حديث محترف 💺", img: "/images/product11.jpg", price: "650 $", pColor: "text-amber-600", shippingNote: "السعر شامل الشحن والعمولة (شحن بحري 🚢)", description: "كرسي تدليك احترافي مصمم لتوفير أقصى درجات الاسترخاء والراحة. يتميز بتقنيات متطورة تشمل التدليك بالهواء المضغوط ونظام تسخين متكامل لدعم الدورة الدموية، وتدليك شامل من الرقبة إلى القدمين.", moq: "1 قطعة", cbm: "1.150", weight: "85" },
    { id: 13, name: "ماكينة طباعه على الملابس المميزة 👕", img: "/images/product13.jpg", price: "270 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "ماكينة طباعة حرارية (مكبس حراري) احترافية ومتميزة، مثالية لمشاريع الطباعة على الملابس، التيشيرتات، والمسطحات. تتميز بلوحة تسخين توفر توزيعاً حرارياً متساوياً لضمان ثبات الألوان وجودة الطباعة، وشاشة تحكم رقمية لضبط الوقت ودرجة الحرارة بدقة.", moq: "1 قطعة", cbm: "0.080", weight: "25" },
    { id: 14, name: "آلة دوش محمولة مميزة 🚿", img: "/images/product14.jpg", price: "16 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "مضخة استحمام محمولة (دوش متنقل) قابلة للشحن، خيارك الأمثل لرحلات التخييم، السفر، أو الاستخدام المنزلي كحل سريع وعملي. تتميز بتصميم مدمج وخفيف، وبطارية قوية قابلة لإعادة الشحن عبر USB، وتدفق مياه سلس ومستمر.", moq: "20 قطعة", cbm: "0.005", weight: "0.8" },
    { id: 15, name: "مثبت تصوير للهواتف (جيمبال) 🎬", img: "/images/product15.jpg", price: "40 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "مثبت تصوير احترافي للهواتف الذكية (Gimbal) مزود بثلاثة محاور لمنع الاهتزاز وتصوير فيديوهات سينمائية ناعمة. يتميز بقاعدة تثبيت (ترايبود) مدمجة، ولوحة تحكم ذكية في المقبض.", moq: "10 قطع", cbm: "0.002", weight: "0.5" },
    { id: 16, name: "ماكينة تقشير وغسيل البطاطس 🥔", img: "/images/product16.jpg", price: "460 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "الحل الأمثل لتقشير وغسيل البطاطس بكميات تجارية في المطاعم والفنادق! تتميز هذه الآلة الصناعية القوية بهيكل متين مصنوع بالكامل من الستانلس ستيل الصحي. توفر عملية مزدوجة بفضل محركها الجبار.", moq: "1 قطعة", cbm: "0.300", weight: "50" },
    { id: 17, name: "آلة تصوير 360° الدوارة 📸", img: "/images/product17.jpg", price: "460 $", pColor: "text-amber-600", shippingNote: "السعر شامل العمولة فقط (لا يشمل الشحن)", description: "ارتقِ بتجربة التصوير في أحداثك ومناسباتك مع آلة تصوير كشك 360° الاحترافية (360 Photo Booth). يتميز هذا الطراز بقطر منصة مريح يبلغ 80 سم، المنصة مزودة بإضاءة LED سفلية مذهلة وحلقة إضاءة RGB.", moq: "5 قطع", cbm: "0.450", weight: "65" }
  ];

  if (selectedProduct) {
    return (
      <main className="min-h-screen bg-white text-right font-sans text-black pb-24" dir="rtl">
        <div className="relative h-80 bg-gray-100 flex items-center justify-center p-4">
          <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 bg-white/80 w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold z-10 text-black">✕</button>
          <img src={selectedProduct.img} className="max-h-full object-contain" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=Kazioni+Store"; }} />
        </div>
        <div className="p-6">
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full text-black">منتج حصري 🇨🇳</span>
          <h2 className="text-2xl font-black mt-3 mb-1 leading-tight text-black">{selectedProduct.name}</h2>
          <p className={"text-xl font-black mb-1 " + selectedProduct.pColor}>{selectedProduct.price}</p>
          <p className={"text-[11px] font-bold mb-4 " + (selectedProduct.shippingNote.includes("شامل") ? "text-red-600" : "text-gray-500")}>{selectedProduct.shippingNote}</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-black border border-gray-100">
            <h4 className="font-bold text-sm mb-3 text-blue-900 underline">تفاصيل الشحن والطلب:</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-white p-2 rounded-lg text-center border border-gray-100 shadow-sm"><p className="text-[10px] text-gray-500 font-bold mb-1">الحجم للقطعة (CBM)</p><p className="text-sm font-black text-blue-800">{selectedProduct.cbm}</p></div>
              <div className="bg-white p-2 rounded-lg text-center border border-gray-100 shadow-sm"><p className="text-[10px] text-gray-500 font-bold mb-1">الوزن للقطعة (KG)</p><p className="text-sm font-black text-orange-600">{selectedProduct.weight}</p></div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{selectedProduct.description}</p>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-500">أقل كمية للطلب:</span><span className="text-sm font-black text-red-600">{selectedProduct.moq}</span>
            </div>
          </div>
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 mb-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm text-gray-800">حدد الكمية المطلوبة:</span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button onClick={() => setProductQty(Math.max(1, productQty - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-lg">-</button>
                <span className="font-black w-6 text-center">{productQty}</span>
                <button onClick={() => setProductQty(productQty + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-lg">+</button>
              </div>
            </div>
            <button onClick={() => addToCart(selectedProduct, productQty)} className="w-full bg-amber-500 text-black py-4 rounded-xl font-black text-lg shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2">
              <span>🛍️</span> أضف إلى السلة
            </button>
          </div>
          <a href={"https://wa.me/" + whatsappNumber + "?text=استفسار سريع عن " + selectedProduct.name} className="block w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold text-center border border-gray-300">تواصل لاستفسار سريع 💬</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-right font-sans text-black pb-32 relative" dir="rtl">
      {/* 1. الشريط العلوي الأزرق */}
      <nav className="bg-blue-900 text-white p-4 shadow-xl sticky top-0 z-40 flex justify-between items-center border-b-4 border-amber-500">
        <div>
          <h1 className="text-xl font-black tracking-tighter text-white">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-amber-300 font-bold uppercase tracking-widest">التجارة والشحن الدولي</p>
        </div>
        <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg border-2 border-white overflow-hidden p-1">
          <img src="/images/logo.png?v=4" alt="لوجو الحاج كزيوني" className="w-full h-full object-contain mix-blend-multiply opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </nav>

      {/* 2. شريط متحرك أسفل العنوان (الأخضر للخدمات المتاحة) */}
      <div className="bg-green-700 text-white p-2 overflow-hidden shadow-inner border-b border-green-800 flex items-center gap-2 px-2">
        {/* الشريط المتحرك */}
        <div className="animate-marquee font-bold text-sm py-2">
          متوفر بيع وشراء عملة USDT 🟢 تواصل معنا لمعرفة أسعار اليوم.
        </div>
      </div>

      {/* مودال السلة */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-[85%] max-w-md bg-gray-50 h-full flex flex-col shadow-2xl animate-slide-in">
            <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-600">✕</button>
              <h2 className="text-lg font-black flex items-center gap-2">سلة المشتريات 🛒</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-5xl mb-3">🪹</span>
                  <p className="font-bold">سلتك فارغة حالياً</p>
                </div>
              ) : (
                cart.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 relative">
                      <button onClick={() => removeFromCart(item.id)} className="absolute top-2 left-2 text-red-500 bg-red-50 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">✕</button>
                      <img src={item.img} className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-1" />
                      <div className="flex-1">
                        <h4 className="text-[11px] font-bold text-gray-800 leading-tight mb-1 pr-6">{item.name}</h4>
                        <p className="text-amber-600 font-black text-xs mb-2">{item.price}</p>
                        <div className="flex items-center gap-2 bg-gray-50 rounded p-1 w-fit border border-gray-200">
                          <button onClick={() => updateCartItemQty(item.id, -1)} className="px-2 font-bold text-gray-600">-</button>
                          <span className="text-xs font-black">{item.qty}</span>
                          <button onClick={() => updateCartItemQty(item.id, 1)} className="px-2 font-bold text-gray-600">+</button>
                        </div>
                      </div>
                    </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="bg-white p-5 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] border-t border-gray-200">
                <div className="flex justify-between items-center mb-2"><span className="text-gray-500 text-xs font-bold">الحجم الإجمالي:</span><span className="font-black text-blue-800 text-sm">{cartTotalCBM.toFixed(3)} CBM</span></div>
                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3"><span className="text-gray-500 text-xs font-bold">الوزن الإجمالي:</span><span className="font-black text-orange-600 text-sm">{cartTotalWeight.toFixed(2)} KG</span></div>
                <div className="flex justify-between items-center mb-4"><span className="font-bold text-gray-800">إجمالي السعر:</span><span className="font-black text-xl text-green-600">{cartTotalPrice} $</span></div>
                <button onClick={checkoutWhatsApp} className="w-full bg-green-500 text-white py-4 rounded-xl font-black shadow-lg flex justify-center items-center gap-2 active:scale-95 transition-all">تأكيد الطلب الآن 📲</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* أسعار الشحن */}
      <section className="p-6 max-w-md mx-auto mt-2 text-black">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h3 className="text-[16px] leading-tight font-black text-gray-800 border-r-4 border-blue-900 pr-3">أسعار الشحن من الصين 🇨🇳 إلى ليبيا 🇱🇾</h3>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-1 rounded-full shadow-sm whitespace-nowrap">أبريل 2026</span>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-4 overflow-hidden duration-300">
          <button onClick={() => setIsAirOpen(!isAirOpen)} className="w-full bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-white flex justify-between items-center shadow-inner focus:outline-none">
            <h4 className="font-bold text-lg text-white">✈️ الشحن الجوي</h4>
            <span className="text-lg text-white">{isAirOpen ? '🔼' : '🔽'}</span>
          </button>
          {isAirOpen && (
            <div className="p-5 space-y-3 bg-blue-50/50 border-t border-blue-100 font-bold text-black">
              <div className="flex justify-between border-b pb-2"><span>عادي (1-100 كجم)</span><span className="text-blue-800">9.25 $</span></div>
              <div className="flex justify-between border-b pb-2"><span>عادي (100-250 كجم)</span><span className="text-blue-800">9.10 $</span></div>
              <div className="flex justify-between border-b pb-2"><span>عادي (250-500 كجم)</span><span className="text-blue-800">9.00 $</span></div>
              <div className="flex justify-between border-b pb-2"><span>بضاعة كوبي 👜</span><span className="text-orange-600">9.40 $</span></div>
              <div className="flex justify-between border-b pb-2"><span>كوزماتك 💄</span><span className="text-orange-600">9.50 $</span></div>
              <div className="flex justify-between"><span>بضاعة طبية 🩺</span><span className="text-red-600">10.50 $</span></div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden duration-300">
          <button onClick={() => setIsSeaOpen(!isSeaOpen)} className="w-full bg-gradient-to-r from-teal-800 to-teal-600 p-4 text-white flex justify-between items-center shadow-inner focus:outline-none">
            <h4 className="font-bold text-lg text-white">🚢 الشحن البحري</h4>
            <span className="text-lg text-white">{isSeaOpen ? '🔼' : '🔽'}</span>
          </button>
          {isSeaOpen && (
            <div className="p-5 space-y-3 bg-teal-50/50 border-t border-teal-100 font-bold text-black">
              <div className="flex justify-between border-b pb-2 text-black"><span>تصنيف عادي 📦</span><span className="text-teal-800">158.5 $ <span className="text-[10px] text-gray-500">/ CBM</span></span></div>
              <div className="flex justify-between border-b pb-2 text-black"><span>ماركة كوبي 👕</span><span className="text-orange-600">168.5 $ <span className="text-[10px] text-gray-500">/ CBM</span></span></div>
              <div className="flex justify-between text-black"><span>كوزماتك 🧴</span><span className="text-orange-600">178.5 $ <span className="text-[10px] text-gray-500">/ CBM</span></span></div>
            </div>
          )}
        </div>
      </section>

      {/* 3. استعادة واجهة الحوالات المالية التفاعلية (البطاقة البيضاء) 💸 */}
      <section className="p-6 max-w-md mx-auto pt-0 text-black">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-t-8 border-emerald-500">
          <h3 className="text-lg font-black text-emerald-800 mb-1 flex items-center tracking-tight">💸 الحوالات المالية الدولية</h3>
          <p className="text-[10px] font-bold text-gray-500 mb-4">تحويلات آمنة وسريعة لمورديك. اضغط على الوجهة للتحويل والاستفسار 👇</p>

          <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleTransferClick('الصين', '🇨🇳')} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl p-3 active:scale-95 transition-all shadow-sm" title="تحويل للصين">
                  <span className="text-3xl">🇨🇳</span>
                  <span className="font-bold text-gray-800 text-sm">الصين</span>
              </button>
              <button onClick={() => handleTransferClick('تركيا', '🇹🇷')} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl p-3 active:scale-95 transition-all shadow-sm" title="تحويل لتركيا">
                  <span className="text-3xl">🇹🇷</span>
                  <span className="font-bold text-gray-800 text-sm">تركيا</span>
              </button>
              <button onClick={() => handleTransferClick('مصر', '🇪🇬')} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl p-3 active:scale-95 transition-all shadow-sm" title="تحويل لمصر">
                  <span className="text-3xl">🇪🇬</span>
                  <span className="font-bold text-gray-800 text-sm">مصر</span>
              </button>
              <button onClick={() => handleTransferClick('تونس', '🇹🇳')} className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xl p-3 active:scale-95 transition-all shadow-sm" title="تحويل لتونس">
                  <span className="text-3xl">🇹🇳</span>
                  <span className="font-bold text-gray-800 text-sm">تونس</span>
              </button>
          </div>
        </div>
      </section>

      {/* حاسبة الحجم */}
      <section className="p-6 max-w-md mx-auto pt-2 text-black">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-t-8 border-teal-700">
          <h3 className="text-lg font-black text-teal-800 mb-2 flex items-center tracking-tight text-black text-black">🧮 حاسبة الحجم (CBM)</h3>
          <div className="grid grid-cols-2 gap-3 mb-4 text-black text-black">
            <input type="number" value={dims.length} onChange={(e)=>setDims({...dims, length: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none text-black" placeholder="الطول cm"/>
            <input type="number" value={dims.width} onChange={(e)=>setDims({...dims, width: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none text-black" placeholder="العرض cm"/>
            <input type="number" value={dims.height} onChange={(e)=>setDims({...dims, height: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none text-black" placeholder="الارتفاع cm"/>
            <input type="number" value={dims.qty} onChange={(e)=>setDims({...dims, qty: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-bold text-sm outline-none text-black" placeholder="العدد"/>
          </div>
          <button onClick={calculateCBM} className="w-full bg-teal-700 text-white py-4 rounded-xl font-black shadow-lg">احسب الآن</button>
          {result !== null && <div className="mt-4 bg-teal-50 border-2 border-teal-100 p-4 rounded-2xl text-center text-3xl font-black text-teal-900">{result} CBM</div>}
        </div>
      </section>

      {/* الكتالوج */}
      <section className="p-6 max-w-md mx-auto pt-2 text-black pb-20">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-orange-500 pr-3 text-black">المنتجات (الكتالوج) 🇨🇳</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col cursor-pointer" onClick={() => { setSelectedProduct(product); setProductQty(1); }}>
              <div className="h-40 bg-gray-50 flex items-center justify-center p-2">
                <img src={product.img} alt={product.name} className="max-h-full max-w-full object-contain" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=H.K+Store"; }} />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between text-center relative">
                <div>
                  <h4 className="font-bold text-[11px] text-black mb-1 leading-tight text-black">{product.name}</h4>
                  <p className={"font-black text-xs " + product.pColor}>{product.price}</p>
                </div>
                <button className="bg-amber-100 text-amber-800 text-[10px] py-1.5 mt-3 rounded-lg font-bold border border-amber-200">استعرض المنتج 🛒</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 flex gap-2">
        <button onClick={shareSite} className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl border border-gray-700 active:scale-95 transition-all text-xl">📤</button>
        <button onClick={() => setIsCartOpen(true)} className="flex-1 bg-amber-500 text-black py-4 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all relative border-2 border-amber-600">
          <span>🛒</span> عرض سلة المشتريات
          {cartTotalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-7 h-7 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-bounce">{cartTotalItems}</span>
          )}
        </button>
      </div>
    </main>
  );
}
