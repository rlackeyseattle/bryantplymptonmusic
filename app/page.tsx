
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-4xl font-bold">Bryant Plympton</h1>
        <p className="text-xl">Country Music | Montana Born Music Artist</p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#music" className="hover:underline">MUSIC</a>
          <a href="#videos" className="hover:underline">VIDEOS</a>
          <a href="#shows" className="hover:underline">SHOWS</a>
          <a href="#about" className="hover:underline">ABOUT</a>
        </div>

        <section id="music" className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">BAPTIZED IN FIRE</h2>
          <p className="mb-4">DEBUT ALBUM BY BRYANT PLYMPTON</p>
          <p>"Baptized in Fire" serves as Bryant Plympton's inaugural album, providing a candid introduction to his persona and distinctive songwriting style. With seven tracks, each unfolds as a narrative, drawing from his life experiences.</p>
          <button className="mt-4 px-6 py-2 bg-foreground text-background rounded-full hover:opacity-90">LISTEN NOW</button>
        </section>

        <section id="about" className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">ABOUT</h2>
          <p>Bryant Plympton, an emerging force in country music, artfully combines modern and alternative influences in his compelling, storytelling-driven sound. With the release of his debut album in August 2023, Bryant delves into personal experiences, offering listeners a genuine glimpse into his journey of growth and resilience.</p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">CONTACT</h2>
          <p>For booking: <a href="mailto:bry.jp10@gmail.com" className="underline">bry.jp10@gmail.com</a></p>
        </section>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm opacity-50">
        <p>© 2024 by Bryant Plympton.</p>
      </footer>
    </div>
  );
}
