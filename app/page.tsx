
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase hover:text-orange-500 transition-colors">
            Bryant Plympton <span className="text-orange-500">&</span> The Stillwaters
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase text-neutral-400">
            <a href="#music" className="hover:text-white transition-colors">Music</a>
            <a href="#shows" className="hover:text-white transition-colors">Shows</a>
            <a href="#store" className="hover:text-white transition-colors">Store</a>
            <Link href="/epk" className="hover:text-white transition-colors text-orange-500">EPK</Link>
          </div>
          {/* Mobile Menu Button Placeholder */}
          <button className="md:hidden text-neutral-400 hover:text-white">
            MENU
          </button>
        </div>
      </nav>

      <main>

        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.jpg"
              alt="Bryant Plympton & The Stillwaters Live"
              fill
              className="object-cover object-center opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/10 to-neutral-950" />
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl animate-fade-in-up">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.5em] text-orange-500 uppercase drop-shadow-lg">
              Northwest Montana
            </h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-2xl leading-none">
              Alternative<br />Country Rock
            </h1>
            <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
              <a href="#music" className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest uppercase transition-colors rounded-sm">
                Stream Latest
              </a>
              <a href="#shows" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold tracking-widest uppercase transition-colors rounded-sm backdrop-blur-sm">
                See Tour Dates
              </a>
            </div>
          </div>
        </section>

        {/* Music Section */}
        <section id="music" className="py-24 px-6 bg-neutral-950">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white">
                Baptized in Fire
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
                The debut album. Seven tracks of raw storytelling, drawing from specific anecdotes to the broader spectrum of life in the American West. A genuine portrait of growth, resilience, and the fire that forges us.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-transform hover:scale-105">
                  Spotify
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#FA243C] hover:bg-[#fc4e61] text-white font-bold rounded-full transition-transform hover:scale-105">
                  Apple Music
                </button>
              </div>
            </div>
            <div className="relative aspect-square bg-neutral-900 border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Album Art Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-bold bg-neutral-900">
                [ALBUM ART]
              </div>
            </div>
          </div>
        </section>

        {/* Shows Section */}
        <section id="shows" className="py-24 px-6 bg-neutral-900 border-y border-white/5">
          <div className="max-w-5xl mx-auto space-y-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white">
              Live Shows
            </h2>

            <div className="grid gap-4 text-left">
              {/* Placeholder Date 1 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/10 hover:border-orange-500/50 bg-neutral-950/50 hover:bg-neutral-950 transition-all">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-sm text-orange-500 font-bold tracking-widest uppercase">OCT 24</span>
                    <span className="block text-2xl font-bold text-white">FRI</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                      The Great Northern Bar
                    </h3>
                    <p className="text-neutral-400">Whitefish, MT</p>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 border border-white/20 hover:bg-white text-white hover:text-black font-bold text-sm tracking-widest uppercase transition-colors whitespace-nowrap">
                  Tickets
                </button>
              </div>

              {/* Placeholder Date 2 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/10 hover:border-orange-500/50 bg-neutral-950/50 hover:bg-neutral-950 transition-all">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-sm text-orange-500 font-bold tracking-widest uppercase">NOV 08</span>
                    <span className="block text-2xl font-bold text-white">SAT</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                      The Rustic Hut
                    </h3>
                    <p className="text-neutral-400">Florence, MT</p>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 border border-white/20 hover:bg-white text-white hover:text-black font-bold text-sm tracking-widest uppercase transition-colors whitespace-nowrap">
                  Tickets
                </button>
              </div>
            </div>

            <button className="px-8 py-3 text-neutral-400 hover:text-white font-bold tracking-widest uppercase border-b border-transparent hover:border-white transition-all">
              View All Dates
            </button>
          </div>
        </section>

        {/* Store Preview */}
        <section id="store" className="py-24 px-6 bg-neutral-950">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white mb-4">
                Merch Store
              </h2>
              <p className="text-neutral-400 max-w-md">Official apparel, vinyl, and accessories directly from the band.</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-orange-500 font-bold tracking-widest uppercase hover:text-white transition-colors">
              Shop All Items <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Product 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-neutral-900 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Placeholder */}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">Logo Tee - Black</h3>
              <p className="text-neutral-500">$30.00</p>
            </div>
            {/* Product 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-neutral-900 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse delay-75" /> {/* Placeholder */}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">Stillwaters Hoodie</h3>
              <p className="text-neutral-500">$55.00</p>
            </div>
            {/* Product 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] bg-neutral-900 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse delay-150" /> {/* Placeholder */}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">Baptized in Fire - Vinyl</h3>
              <p className="text-neutral-500">$35.00</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-white/10 text-center space-y-8">
          <div className="flex justify-center gap-8">
            {/* Social Icons Placeholder */}
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">IG</a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">FB</a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">YT</a>
          </div>
          <p className="text-neutral-600 text-sm tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Bryant Plympton & The Stillwaters. <br className="md:hidden" /> All Rights Reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}
