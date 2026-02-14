
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src="/images/hero.jpg"
          alt="Bryant Plympton Live"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4 drop-shadow-lg">Bryant Plympton</h1>
          <p className="text-xl md:text-2xl tracking-widest uppercase font-light drop-shadow-md">Montana Born • Country Music</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="flex justify-center gap-8 text-sm md:text-base tracking-widest">
          <a href="#music" className="hover:text-gray-400 transition-colors">MUSIC</a>
          <a href="#videos" className="hover:text-gray-400 transition-colors">VIDEOS</a>
          <a href="#about" className="hover:text-gray-400 transition-colors">ABOUT</a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">CONTACT</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-8 md:p-20 space-y-32">

        {/* Album Section */}
        <section id="music" className="text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">BAPTIZED IN FIRE</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Debut Album Now Available</p>

          <div className="prose prose-invert mx-auto">
            <p className="text-lg leading-relaxed text-gray-300">
              "Baptized in Fire" serves as Bryant Plympton's inaugural album, providing a candid introduction to his persona and distinctive songwriting style.
              With seven tracks, each unfolds as a narrative, drawing from his life experiences.
              From specific anecdotes to a broader spectrum of life encounters, the album weaves together a tapestry that paints a genuine portrait of him as an artist.
            </p>
          </div>

          <div className="pt-8">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors tracking-wide">
              LISTEN NOW
            </button>
          </div>
        </section>

        {/* Video Placeholder */}
        <section id="videos" className="text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">VIDEOS</h2>
          <div className="aspect-video w-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
            <p className="text-gray-500">Latest Music Video Coming Soon</p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">ABOUT</h2>
            <div className="h-1 w-20 bg-white/20"></div>
          </div>
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              Bryant Plympton, an emerging force in country music, artfully combines modern and alternative influences in his compelling, storytelling-driven sound.
              With the release of his debut album in August 2023, Bryant delves into personal experiences, offering listeners a genuine glimpse into his journey of growth and resilience.
            </p>
            <p>
              The visual backdrop to Bryant's music paints a vivid picture of dark outdoor scenes, setting the stage for the emotional landscapes his songs explore.
              Rain, snow, and fire become symbolic elements that enhance the relatability of his narratives.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center space-y-8 py-20 border-t border-white/10">
          <h2 className="text-3xl font-bold">BOOKING & INQUIRIES</h2>
          <a href="mailto:bry.jp10@gmail.com" className="text-2xl md:text-4xl hover:text-gray-400 transition-colors underline decoration-1 underline-offset-8">
            bry.jp10@gmail.com
          </a>
        </section>

      </main>

      <footer className="py-12 text-center text-sm text-gray-600 border-t border-white/10">
        <p>© 2026 Bryant Plympton Music.</p>
      </footer>
    </div>
  );
}
