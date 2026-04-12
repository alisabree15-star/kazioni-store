"use client";

export default function Home() {
  const whatsappNumber = "218915044855"; // ضعه هنا بدقة
  const message = "السلام عليكم الحاج كزيوني، استفسر عن المنتج المعروض";
  const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

  return (
    <main className="min-h-screen bg-white text-right font-sans" dir="rtl">
      <nav className="bg-blue-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">الحاج كزيوني & Swivel</h1>
        <span className="bg-orange-600 text-[10px] px-2 py-1 rounded-full font-bold">متجر ليبيا</span>
      </nav>

      <section className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <div className="relative h-72 w-full bg-gray-50 flex items-center justify-center">
            <img 
              src="/images/product1.jpg" 
              alt="منتج الحاج كزيوني"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/400x400.png?text=H.K+Store";
              }}
            />
          </div>
          
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 italic">وصل حديثاً من الصين 📦</h2>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              بضاعة مختارة بعناية من فريق الحاج كزيوني لزبائننا الكرام.
            </p>
            <div className="mt-4 text-blue-700 font-black text-2xl tracking-tighter">السعر عند الاستفسار</div>
            
            <a href={whatsappLink} target="_blank" className="block w-full mt-6 bg-green-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all">
              اطلب عبر واتساب الآن
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-400 text-[10px]">
        <p>تصميم وتطوير: م. علي دخيل © 2026</p>
      </footer>
    </main>
  );
}
