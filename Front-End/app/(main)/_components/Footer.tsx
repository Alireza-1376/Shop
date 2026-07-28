export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col items-center text-center space-y-4">

          <h2 className="text-3xl font-bold text-white">
            شمرون کباب
          </h2>

          <p className="max-w-md text-sm leading-7 text-zinc-400">
            طعم اصیل کباب ایرانی با بهترین مواد اولیه، محیطی دلنشین و
            تجربه‌ای متفاوت برای شما و خانواده‌تان.
          </p>

          <div className="text-sm text-zinc-500">
            تهران، ایران
          </div>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Shemroon Kebab. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}