"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Track {
  title: string;
  src: string;
  duration: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function Home() {
  // Audio Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    "tee": "M",
    "hoodie": "L"
  });

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Audio Element Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks: Track[] = [
    { title: "Born and Raised", src: "/audio/01 - Born and Raised.mp3", duration: "3:53" },
    { title: "Hit That Highway", src: "/audio/02 - Hit That Highway.mp3", duration: "3:53" },
    { title: "Baptized in Fire", src: "/audio/03 - Baptized in Fire.mp3", duration: "3:53" },
    { title: "Front Porch Wraparound", src: "/audio/04 - Front Porch Wraparound.mp3", duration: "3:53" },
    { title: "Two Dicks", src: "/audio/05 - Two Dicks.mp3", duration: "2:14" },
    { title: "Outside This Bar", src: "/audio/06 - Outside This Bar.mp3", duration: "3:53" },
    { title: "This Old Guitar", src: "/audio/07 - This Old Guitar.mp3", duration: "3:53" }
  ];

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle Track Change
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    
    // Tiny delay to ensure source is updated in DOM before play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Playback interrupted: ", err));
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Playback interrupted: ", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    selectTrack(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    selectTrack(prevIndex);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Cart Operations
  const addToCart = (id: string, name: string, price: number, image: string, hasSize: boolean = false) => {
    const size = hasSize ? selectedSizes[id] || "M" : "N/A";
    const cartItemId = `${id}-${size}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cartItemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: cartItemId, name, price, size, quantity: 1, image }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-orange-500/30 relative">
      
      {/* Background Ambience / Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Floating Orange Glow Effect (Top Right) */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none z-0" />
      
      {/* HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-lg border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold font-display tracking-widest uppercase hover:text-orange-500 transition-colors duration-300">
            Bryant Plympton <span className="text-orange-500">&</span> The Stillwaters
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase items-center text-neutral-400">
            <a href="#music" className="hover:text-white transition-colors">Music</a>
            <a href="#shows" className="hover:text-white transition-colors">Tour Dates</a>
            <a href="#store" className="hover:text-white transition-colors">Store</a>
            <Link href="/epk" className="hover:text-white transition-colors text-orange-500">EPK</Link>
            
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 ml-4 hover:text-orange-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart Icon Mobile */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-orange-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-neutral-950 border-b border-white/5 py-6 px-8 flex flex-col gap-6 md:hidden animate-fade-in z-50">
            <a 
              href="#music" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium tracking-widest text-neutral-300 hover:text-white transition-colors"
            >
              MUSIC
            </a>
            <a 
              href="#shows" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium tracking-widest text-neutral-300 hover:text-white transition-colors"
            >
              TOUR DATES
            </a>
            <a 
              href="#store" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium tracking-widest text-neutral-300 hover:text-white transition-colors"
            >
              STORE
            </a>
            <Link 
              href="/epk" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
            >
              EPK (PRESS KIT)
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero Section */}
        <section className="relative h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.jpg"
              alt="Bryant Plympton Live"
              fill
              className="object-cover object-center opacity-45 scale-105 hover:scale-100 transition-all duration-[3.5s] ease-out filter grayscale brightness-75"
              priority
            />
            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-neutral-950/80" />
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_30%,#050505_95%)" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-6 pt-16 animate-fade-in-up">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.5em] text-orange-500 uppercase font-display select-none">
              Northwest Montana
            </h2>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white uppercase font-display leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Bryant Plympton<br />
              <span className="text-neutral-400 text-3xl md:text-5xl font-light tracking-[0.2em] font-sans">
                & THE STILLWATERS
              </span>
            </h1>
            <p className="text-neutral-400 font-light text-sm md:text-lg max-w-2xl mx-auto tracking-wide">
              Alternative Country Rock born from the fire and ice of the northern Rockies. Storytelling roots, raw rock grit, and expansive storytelling.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#music" 
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 shadow-lg shadow-orange-600/10 hover:shadow-orange-500/20 active:translate-y-0"
              >
                Listen Now
              </a>
              <a 
                href="#shows" 
                className="px-8 py-4 border border-white/20 hover:border-orange-500/40 hover:bg-white/5 text-white hover:text-orange-500 font-bold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:-translate-y-0.5 active:translate-y-0"
              >
                Tour Dates
              </a>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold select-none">Scroll</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Music Section */}
        <section id="music" className="py-32 px-6 max-w-7xl mx-auto relative">
          
          <div className="absolute -left-[10%] top-[20%] w-[35vw] h-[35vw] rounded-full bg-orange-950/10 blur-[100px] pointer-events-none z-0" />

          <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
            
            {/* Left Col: Description & Album Art */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">The Music</span>
                <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white mt-2">
                  Baptized in Fire
                </h2>
                <div className="h-1 w-16 bg-orange-600 mt-4 rounded-full" />
              </div>
              
              <div className="relative aspect-square w-full max-w-[400px] mx-auto rounded-lg overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 bg-neutral-900">
                <Image
                  src="/images/album_art.png"
                  alt="Baptized in Fire Album Art"
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg shadow-orange-600/30"
                  >
                    {isPlaying ? (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-neutral-400 font-light leading-relaxed">
                  &ldquo;Baptized in Fire&rdquo; serves as Bryant Plympton's debut album, providing a candid introduction to his songwriting and alternative country style. With seven tracks, each unfolds as a narrative, drawing from personal anecdotes to the broader spectrum of life in the American West.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a 
                    href="https://open.spotify.com/artist/0b9z1lR6wYxZ1uJ5a8yK7r"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] font-bold text-xs tracking-wider uppercase rounded-full transition-colors"
                  >
                    Spotify Artist Page
                  </a>
                  <a 
                    href="https://music.apple.com/us/artist/bryant-plympton/1699995574"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#FA243C]/10 hover:bg-[#FA243C]/20 border border-[#FA243C]/30 text-[#FA243C] font-bold text-xs tracking-wider uppercase rounded-full transition-colors"
                  >
                    Apple Music
                  </a>
                </div>
              </div>
            </div>

            {/* Right Col: Custom Audio Player */}
            <div className="lg:col-span-7">
              <div className="glassmorphism rounded-xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] space-y-8 animate-glow">
                
                {/* Currently Playing Info */}
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-white/10">
                    <Image
                      src="/images/album_art.png"
                      alt="Album Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">NOW PLAYING</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {tracks[currentTrackIndex].title}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Bryant Plympton & The Stillwaters • Baptized in Fire
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-600 outline-none"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-between">
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-3 w-1/3">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                      ) : volume < 0.5 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 sm:w-24 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-600 outline-none"
                    />
                  </div>

                  {/* Playback Buttons */}
                  <div className="flex items-center gap-6 justify-center">
                    <button 
                      onClick={handlePrevious}
                      className="text-neutral-400 hover:text-white transition-colors p-2"
                      title="Previous"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                      </svg>
                    </button>

                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 shadow-md shadow-white/5"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>

                    <button 
                      onClick={handleNext}
                      className="text-neutral-400 hover:text-white transition-colors p-2"
                      title="Next"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Empty right-aligned element to balance out volume input */}
                  <div className="w-1/3 flex justify-end text-neutral-500 font-bold tracking-widest text-[10px] uppercase pointer-events-none select-none">
                    Stereo 2.0
                  </div>
                </div>

                {/* Interactive Playlist */}
                <div className="border-t border-white/5 pt-6 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 flex justify-between">
                    <span>TRACKLIST</span>
                    <span className="text-[10px] text-neutral-500">7 Songs</span>
                  </h4>
                  <div className="max-h-[220px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
                    {tracks.map((track, index) => {
                      const isActive = index === currentTrackIndex;
                      return (
                        <div 
                          key={index}
                          onClick={() => selectTrack(index)}
                          className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-300 ${
                            isActive 
                              ? "bg-orange-600/10 border border-orange-500/20 text-white" 
                              : "hover:bg-white/5 border border-transparent text-neutral-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-mono w-4 ${isActive ? "text-orange-500 font-bold" : "text-neutral-600"}`}>
                              {index + 1}
                            </span>
                            <span className="text-sm font-semibold tracking-wide">
                              {track.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {isActive && isPlaying && (
                              <div className="flex items-end gap-0.5 h-3">
                                <div className="w-0.5 bg-orange-500 animate-[bounce_0.8s_infinite_delay-100] h-3" />
                                <div className="w-0.5 bg-orange-500 animate-[bounce_0.6s_infinite_delay-200] h-2" />
                                <div className="w-0.5 bg-orange-500 animate-[bounce_0.9s_infinite] h-2.5" />
                              </div>
                            )}
                            <span className="text-xs font-mono text-neutral-500">
                              {track.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* About / Bio Section */}
        <section id="about" className="py-32 px-6 bg-neutral-900/40 border-y border-white/5 relative">
          
          <div className="absolute right-[-10%] bottom-[20%] w-[35vw] h-[35vw] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-16 items-center relative z-10">
            
            {/* Biography details */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">The Story</span>
                <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white mt-2">
                  Bryant Plympton
                </h2>
                <div className="h-1 w-16 bg-orange-600 mt-4 rounded-full" />
              </div>
              <div className="space-y-4 text-neutral-300 leading-relaxed font-light text-base md:text-lg">
                <p>
                  Bryant Plympton, an emerging force in alternative country-rock, artfully combines traditional country songwriting with the raw, atmospheric energy of modern rock. Born and raised in Montana, he began crafting his signature sound as a teenager, drawing inspiration from the vast mountain landscapes and rural communities of the American West.
                </p>
                <p>
                  With the release of his debut project *Baptized in Fire*, Bryant delves into personal stories of growth, resilience, and the rugged realities of Western life. The visual backdrop to his music paints a vivid picture of dark, outdoor elements—where rain, snow, and fire become symbolic characters in his songwriting.
                </p>
                <p>
                  Performing alongside his band, **The Stillwaters**, Bryant has established a powerful local presence in Montana, bringing raw country-rock to stages across the Northwest.
                </p>
              </div>
              <div className="pt-4">
                <Link 
                  href="/epk" 
                  className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500/30 hover:border-orange-500/70 hover:bg-orange-500/5 text-orange-500 hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-300"
                >
                  View Electronic Press Kit (EPK) <span>→</span>
                </Link>
              </div>
            </div>

            {/* Visual/Image Collage */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-[360px] mx-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                <Image
                  src="/images/hero.jpg"
                  alt="Bryant Plympton Performing Live"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <h4 className="text-white font-bold tracking-wide uppercase">Live in Whitefish</h4>
                  <p className="text-xs text-orange-500 font-semibold uppercase tracking-wider">The Stillwaters Tour</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Shows Section */}
        <section id="shows" className="py-32 px-6 max-w-5xl mx-auto">
          
          <div className="space-y-16 text-center">
            
            <div className="inline-block">
              <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">On The Road</span>
              <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white mt-2">
                Live Tour Dates
              </h2>
              <div className="h-1 w-16 bg-orange-600 mt-4 mx-auto rounded-full" />
            </div>

            <div className="grid gap-4 text-left">
              
              {/* Tour Date 1 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/5 hover:border-orange-500/30 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all duration-300 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-xs text-orange-500 font-bold tracking-widest uppercase">OCT 24</span>
                    <span className="block text-2xl font-bold font-display text-white">FRI</span>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                        The Great Northern Bar
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-orange-600/10 text-orange-500 text-[10px] font-bold tracking-wider rounded uppercase md:self-center w-max mx-auto md:mx-0">
                        Selling Fast
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">Whitefish, MT</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Redirecting to ticketing partner... (Mock Integration)")}
                  className="mt-6 md:mt-0 px-6 py-2.5 border border-white/10 hover:border-orange-500 hover:bg-orange-600 hover:text-white text-neutral-300 font-bold text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap rounded"
                >
                  Get Tickets
                </button>
              </div>

              {/* Tour Date 2 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/5 hover:border-orange-500/30 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all duration-300 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-xs text-orange-500 font-bold tracking-widest uppercase">NOV 08</span>
                    <span className="block text-2xl font-bold font-display text-white">SAT</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                      The Rustic Hut
                    </h3>
                    <p className="text-neutral-400 text-sm">Florence, MT</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Redirecting to ticketing partner... (Mock Integration)")}
                  className="mt-6 md:mt-0 px-6 py-2.5 border border-white/10 hover:border-orange-500 hover:bg-orange-600 hover:text-white text-neutral-300 font-bold text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap rounded"
                >
                  Get Tickets
                </button>
              </div>

              {/* Tour Date 3 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/5 hover:border-orange-500/30 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all duration-300 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-xs text-orange-500 font-bold tracking-widest uppercase">NOV 22</span>
                    <span className="block text-2xl font-bold font-display text-white">SAT</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                      Log Cabin Bar
                    </h3>
                    <p className="text-neutral-400 text-sm">Choteau, MT</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Redirecting to ticketing partner... (Mock Integration)")}
                  className="mt-6 md:mt-0 px-6 py-2.5 border border-white/10 hover:border-orange-500 hover:bg-orange-600 hover:text-white text-neutral-300 font-bold text-xs tracking-widest uppercase transition-all duration-300 whitespace-nowrap rounded"
                >
                  Get Tickets
                </button>
              </div>

              {/* Tour Date 4 */}
              <div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/5 hover:border-orange-500/30 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all duration-300 rounded-lg opacity-60">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                  <div className="text-center md:text-left min-w-[100px]">
                    <span className="block text-xs text-neutral-500 font-bold tracking-widest uppercase">DEC 05</span>
                    <span className="block text-2xl font-bold font-display text-neutral-500">FRI</span>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-lg font-bold text-neutral-400 line-through">
                        The Top Hat
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-neutral-800 text-neutral-500 text-[10px] font-bold tracking-wider rounded uppercase md:self-center w-max mx-auto md:mx-0">
                        Sold Out
                      </span>
                    </div>
                    <p className="text-neutral-500 text-sm">Missoula, MT</p>
                  </div>
                </div>
                <button 
                  disabled
                  className="mt-6 md:mt-0 px-6 py-2.5 border border-neutral-800 text-neutral-600 font-bold text-xs tracking-widest uppercase cursor-not-allowed whitespace-nowrap rounded"
                >
                  Sold Out
                </button>
              </div>

            </div>

            <button 
              onClick={() => alert("More tour dates to be announced soon! Join the newsletter to stay updated.")}
              className="px-8 py-3 text-neutral-400 hover:text-orange-500 font-bold tracking-widest text-xs uppercase border-b border-transparent hover:border-orange-500 transition-all duration-300"
            >
              Request a Show / View Full Tour
            </button>
          </div>
        </section>

        {/* Store Section */}
        <section id="store" className="py-32 px-6 bg-neutral-950 border-t border-white/5 relative">
          
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-orange-500 font-bold text-xs tracking-widest uppercase">Official Merchandise</span>
                <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white mt-2">
                  Band Store
                </h2>
                <div className="h-1 w-16 bg-orange-600 mt-4 rounded-full" />
              </div>
              <p className="text-neutral-400 max-w-sm font-light text-sm">
                Get the official apparel and music releases. Ships worldwide from Montana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Product 1 */}
              <div className="group space-y-4">
                <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  
                  {/* Procedural design placeholder representing Logo Tee */}
                  <div className="relative w-40 h-40 transform group-hover:scale-105 transition-transform duration-500 flex flex-col items-center justify-center">
                    <span className="text-white text-3xl font-display font-black tracking-widest uppercase select-none opacity-30">STILLWATERS</span>
                    <span className="text-orange-500 text-xs font-bold tracking-[0.4em] uppercase select-none mt-1 opacity-40">TOUR TEE</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => addToCart("tee", "Stillwaters Tour Tee", 30.00, "/images/hero.jpg", true)}
                      className="w-full py-2 bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-orange-500 hover:text-white transition-colors duration-300 rounded"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors duration-300">Stillwaters Tour Tee</h3>
                    <p className="text-xs text-neutral-500">Black Premium Cotton</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-white">$30.00</span>
                    <div className="flex gap-1.5 mt-2">
                      {["S", "M", "L", "XL"].map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setSelectedSizes(prev => ({ ...prev, tee: sz }))}
                          className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center border font-semibold ${
                            selectedSizes["tee"] === sz 
                              ? "bg-orange-600 border-orange-600 text-white" 
                              : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="group space-y-4">
                <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  
                  {/* Procedural design placeholder representing Hoodie */}
                  <div className="relative w-40 h-40 transform group-hover:scale-105 transition-transform duration-500 flex flex-col items-center justify-center">
                    <span className="text-white text-3xl font-display font-black tracking-widest uppercase select-none opacity-30">BP & TS</span>
                    <span className="text-orange-500 text-xs font-bold tracking-[0.4em] uppercase select-none mt-1 opacity-40">HOODIE</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => addToCart("hoodie", "Stillwaters Pullover Hoodie", 55.00, "/images/hero.jpg", true)}
                      className="w-full py-2 bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-orange-500 hover:text-white transition-colors duration-300 rounded"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors duration-300">Stillwaters Pullover Hoodie</h3>
                    <p className="text-xs text-neutral-500">Premium heavyweight fleece</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-white">$55.00</span>
                    <div className="flex gap-1.5 mt-2">
                      {["M", "L", "XL", "XXL"].map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setSelectedSizes(prev => ({ ...prev, hoodie: sz }))}
                          className={`text-[10px] w-6 h-5 rounded-full flex items-center justify-center border font-semibold ${
                            selectedSizes["hoodie"] === sz 
                              ? "bg-orange-600 border-orange-600 text-white" 
                              : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="group space-y-4">
                <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  
                  {/* Album Cover Art */}
                  <Image
                    src="/images/album_art.png"
                    alt="Baptized in Fire Vinyl"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => addToCart("vinyl", "Baptized in Fire Gatefold Vinyl", 35.00, "/images/album_art.png", false)}
                      className="w-full py-2 bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-orange-500 hover:text-white transition-colors duration-300 rounded"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors duration-300">Baptized in Fire Vinyl</h3>
                    <p className="text-xs text-neutral-500">180g Orange Gatefold Vinyl</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-white">$35.00</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Contact/Booking Section */}
        <section className="py-32 px-6 bg-neutral-900/60 border-t border-white/5 text-center space-y-8 relative">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white font-display">
              Booking & Inquiries
            </h2>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              For booking, interview requests, management, or press inquiries, please get in touch with our team directly.
            </p>
            <div className="py-4">
              <a 
                href="mailto:bry.jp10@gmail.com" 
                className="text-2xl md:text-3xl text-orange-500 font-mono font-bold hover:text-white transition-colors decoration-1 underline decoration-orange-500/40 hover:decoration-white underline-offset-8"
              >
                bry.jp10@gmail.com
              </a>
            </div>
            <p className="text-xs text-neutral-600">
              Northwest Montana • USA
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-16 bg-[#030303] border-t border-white/5 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          
          <div className="flex justify-center gap-8 items-center text-xs font-bold tracking-widest text-neutral-500 uppercase">
            <a href="#music" className="hover:text-white transition-colors">Music</a>
            <a href="#shows" className="hover:text-white transition-colors">Tour</a>
            <a href="#store" className="hover:text-white transition-colors">Store</a>
            <Link href="/epk" className="hover:text-white transition-colors text-orange-500">EPK</Link>
          </div>

          <div className="flex justify-center gap-6">
            <a 
              href="https://open.spotify.com/artist/0b9z1lR6wYxZ1uJ5a8yK7r" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 hover:bg-orange-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
              title="Spotify"
            >
              <svg className="w-5 h-5 fill-current text-neutral-400 hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.669.47-.745 3.848-.877 7.14-.5 9.82.1.295.18.387.563.207.857zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.572 11.35 1.343.367.226.488.707.26 1.074zm.106-2.833C14.733 8.948 9.53 8.775 6.545 9.68c-.482.146-.99-.126-1.137-.608-.146-.483.126-.99.608-1.137 3.447-1.045 9.19-.85 12.863 1.33.435.258.578.82.32 1.255-.258.435-.82.578-1.255.32z"/>
              </svg>
            </a>
            <a 
              href="https://music.apple.com/us/artist/bryant-plympton/1699995574" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 hover:bg-orange-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
              title="Apple Music"
            >
              <svg className="w-5 h-5 fill-current text-neutral-400 hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.29 11.29c-.36.36-.86.58-1.4.58h-1.89v1.89c0 .54-.22 1.04-.58 1.4-.36.36-.86.58-1.4.58s-1.04-.22-1.4-.58c-.36-.36-.58-.86-.58-1.4v-4.17c0-.54.22-1.04.58-1.4.36-.36.86-.58 1.4-.58h3.87c.37 0 .7.15.95.39.24.25.39.58.39.95v1.36c0 .54-.22 1.04-.58 1.4-.36.36-.86.58-1.4.58zm0-3.89c-.36.36-.86.58-1.4.58h-1.89v-1.89c0-.54.22-1.04.58-1.4.36-.36.86-.58 1.4-.58s1.04.22 1.4.58c.36.36.58.86.58 1.4v1.31c0 .37-.15.7-.39.95-.25.24-.58.39-.95.39z"/>
              </svg>
            </a>
            <a 
              href="https://music.youtube.com/search?q=Bryant+Plympton" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 hover:bg-orange-600 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
              title="YouTube Music"
            >
              <svg className="w-5 h-5 fill-current text-neutral-400 hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </a>
          </div>

          <p className="text-neutral-600 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Bryant Plympton & The Stillwaters. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <div 
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out">
                <div className="flex h-full flex-col bg-neutral-950 border-l border-white/10 shadow-2xl">
                  
                  {/* Cart Header */}
                  <div className="flex items-start justify-between border-b border-white/5 px-6 py-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white" id="slide-over-title">
                      Your Shopping Cart
                    </h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-neutral-400 hover:text-white transition-colors p-1"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <svg className="w-16 h-16 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-neutral-400 font-light">Your cart is currently empty.</p>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wider uppercase rounded"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-white/5">
                            <div className="relative w-20 h-20 bg-neutral-900 border border-white/10 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <h3 className="text-sm font-bold text-white tracking-wide">{item.name}</h3>
                              <p className="text-xs text-neutral-500">
                                {item.size !== "N/A" ? `Size: ${item.size}` : "One Size"}
                              </p>
                              <div className="flex items-center gap-3 pt-2">
                                <div className="flex items-center border border-white/10 rounded bg-neutral-900">
                                  <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-2 py-0.5 text-neutral-400 hover:text-white"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-xs font-mono font-bold text-white">
                                    {item.quantity}
                                  </span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-2 py-0.5 text-neutral-400 hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[10px] uppercase font-bold text-neutral-500 hover:text-orange-500 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-sm font-bold text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cart.length > 0 && (
                    <div className="border-t border-white/5 px-6 py-6 bg-neutral-950 space-y-6">
                      <div className="flex justify-between text-base font-bold text-white uppercase tracking-wider">
                        <span>Subtotal</span>
                        <span className="font-mono">${getCartTotal().toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-neutral-500 font-light">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div>
                        <button 
                          onClick={() => alert("Checkout integration coming soon! This is a demo checkout.")}
                          className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-widest text-xs uppercase rounded transition-colors duration-300 shadow-lg shadow-orange-600/10"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
