// app/page.tsx
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Archive from './components/Archive';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#0A0A0A]">
      {/* Global Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 max-w-screen-2xl mx-auto opacity-[0.03]">
        <div className="h-full w-[1px] bg-white"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white hidden lg:block"></div>
        <div className="h-full w-[1px] bg-white hidden md:block"></div>
        <div className="h-full w-[1px] bg-white"></div>
      </div>

      <Hero />
      <Gallery />
      <Stats />
      <Archive />
      <Footer />
    </main>
  );
}