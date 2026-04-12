"use client";

export default function Home() {
  const whatsappNumber = "218915044855"; // تأكد من رقمك هنا مرة أخرى
  const whatsappLink = "https://wa.me/" + whatsappNumber;

  return (
    <main className="min-h-screen bg-gray-50 text-right font-sans" dir="rtl">
      {/* الهيدر */}
      <nav className="bg-blue-900 text-white p-5 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black">الحاج كزيوني & Swivel</h1>
          <p className="text-[10px] text-blue-200">للشحن الدولي والتجارة</p>
        </div>
        <span className="bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-sm">ليبيا 🇱🇾</span>
      </nav>

      {/* قسم المنتج المميز */}
      <section className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="relative h-80 w-full bg-gray-50 flex items-center justify-center">
            <img 
              src="/images/product1.jpg" 
              alt="منتج الحاج كزيوني"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">ولاعة ساعة فاخرة ✨</h2>
            <div className="mt-3 text-blue-700 font-black text-2xl tracking-tighter">السعر عند الاستفسار</div>
            <a href={whatsappLink} className="block w-full mt-6 bg-green-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all">
              اطلب عبر واتساب الآن
            </a>
          </div>
        </div>
      </section>

      {/* قسم خدمات الشحن الجديد */}
      <section className="px-6 pb-10 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-orange-500 pr-3">خدماتنا في الشحن 🚢✈️</h3>
        
        <div className="grid gap-4">
          {/* الشحن الجوي */}
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-2xl ml-3">✈️</span>
              <h4 className="font-bold text-blue-900 text-lg">الشحن الجوي السريع</h4>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              تصل بضاعتك من الصين إلى طرابلس/بنغازي في غضون 7 إلى 10 أيام. مثالي للمنتجات الخفيفة والطلبيات المستعجلة.
            </p>
          </div>

          {/* الشحن البحري */}
          <div className="bg-green-50 p-5 rounded-2xl border border-green-100 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-2xl ml-3">🚢</span>
              <h4 className="font-bold text-green-900 text-lg">الشحن البحري (حاويات)</h4>
            </div>
            <p className="text-sm text-green-800 leading-relaxed">
              الحل الأنسب للبضائع الكبيرة والأثاث. نوفر لك شحن جزئي أو حاوية كاملة بأسعار منافسة للسوق الليبي.
            </p>
          </div>
          
          {/* وسيط تجاري */}
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-2xl ml-3">🤝</span>
              <h4 className="font-bold text-orange-900 text-lg">الوساطة التجارية</h4>
            </div>
            <p className="text-sm text-orange-800 leading-relaxed">
              نقوم بالدفع للمصانع في الصين، فحص الجودة، والتأكد من مطابقة المواصفات قبل الشحن.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-[10px] bg-white border-t border-gray-100">
        <p>تصميم وتطوير: م. علي دخيل © 2026</p>
        <p className="mt-1">الحاج كزيوني & Swivel - ثقتكم هي رأس مالنا</p>
      </footer>
    </main>
  );
}
