"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EPKPage() {
  const [downloadingBio, setDownloadingBio] = useState(false);
  const [downloadingPhotos, setDownloadingPhotos] = useState(false);

  const triggerDownload = (type: string, setStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
      alert(`${type} downloaded successfully! (Demo download triggered)`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-orange-500/30 relative">
      
      {/* Background Ambience / Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-950/10 blur-[120px] pointer-events-none z-0" />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-lg border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold font-display tracking-widest uppercase hover:text-orange-500 transition-colors duration-300">
            BP <span className="text-orange-500">&</span> TS
          </Link>
          <Link href="/" className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors duration-300">
            ← Back to Site
          </Link>
        </div>
      </nav>

      {/* Main EPK Section */}
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto space-y-32 relative z-10">

        {/* EPK Header */}
        <section className="space-y-8 text-center animate-fade-in-up">
          <div className="space-y-2">
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase font-display">Official Media Kit</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-display text-white">
              Electronic Press Kit
            </h1>
            <div className="h-1 w-24 bg-orange-600 mx-auto rounded-full mt-4" />
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Bryant Plympton & The Stillwaters are an Alternative Country Rock outfit hailing from the rugged landscapes of Northwest Montana.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={() => triggerDownload("Biography PDF", setDownloadingBio)}
              className="px-6 py-3 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-sm shadow-md"
            >
              {downloadingBio ? "Downloading..." : "Download Bio (PDF)"}
            </button>
            <button 
              onClick={() => triggerDownload("Press Photos ZIP", setDownloadingPhotos)}
              className="px-6 py-3 border border-white/20 hover:border-orange-500/50 hover:bg-white/5 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm"
            >
              {downloadingPhotos ? "Downloading..." : "Download Photos (ZIP)"}
            </button>
          </div>
        </section>

        {/* Fact Sheet Dashboard */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 bg-neutral-900/10 rounded-lg backdrop-blur-sm px-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold font-display text-orange-500">MONTANA</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Origin</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold font-display text-orange-500">ALT-COUNTRY</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Genre</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold font-display text-orange-500">AUG 2023</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Debut Release</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold font-display text-orange-500">INDEPENDENT</h3>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Label</p>
          </div>
        </section>

        {/* Detailed Story & Band Members */}
        <section className="grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-neutral-300 leading-relaxed font-light text-base md:text-lg">
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-white">
                The Narrative
              </h2>
              <p>
                Born from the fire and ice of the northern Rockies, Bryant Plympton & The Stillwaters craft a sound that is as expansive as the Big Sky itself. Merging the storytelling traditions of classic outlaw country with the raw, atmospheric energy of alternative country rock, they have carved a unique niche in the Pacific Northwest music scene.
              </p>
              <p>
                Their debut album, <em className="text-white font-semibold">Baptized in Fire</em>, serves as a testament to their roots. Recorded in 2023, the record explores themes of resilience, loss, and the untamed beauty of Montana. Bryant's distinctive baritone vocals, paired with the band's dynamic guitar-driven instrumentation, create a sonic experience that is both intimate and anthemic.
              </p>
              <p>
                From specific anecdotes of small-town tavern life to broader reflections on change and heritage, their songs resonate with anyone who has ever faced the elements and found themselves stronger on the other side.
              </p>
            </div>
            
            {/* Band Lineup */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-white uppercase tracking-wider">Lineup</h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded">
                  <span className="block text-white">Bryant Plympton</span>
                  <span className="text-xs text-orange-500">Lead Vocals / Acoustic Guitar</span>
                </div>
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded">
                  <span className="block text-white">The Stillwaters</span>
                  <span className="text-xs text-orange-500">Lead Guitar, Bass, Drums</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold font-display uppercase text-white mb-4">Promo Media</h2>
            <div className="grid gap-6">
              
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/10 group shadow-lg bg-neutral-900">
                <Image
                  src="/images/hero.jpg"
                  alt="Band Promo 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 flex items-end p-4">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Live Performance Photo</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/10 group shadow-lg bg-neutral-900">
                <Image
                  src="/images/album_art.png"
                  alt="Band Promo 2"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 flex items-end p-4">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Baptized in Fire Album Cover</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* Video Embed Placeholders / Press Reviews */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold font-display uppercase text-white pb-4 border-b border-white/5">
            Press & Media Assets
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-neutral-900/40 border border-white/5 rounded-lg flex flex-col items-center justify-center p-8 text-center space-y-4">
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">YouTube Embed</span>
              <p className="text-sm text-neutral-400 font-light max-w-xs">
                To embed live videos, add your YouTube Video ID in the settings config.
              </p>
              <a 
                href="https://music.youtube.com/search?q=Bryant+Plympton"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-white/10 hover:border-orange-500 hover:text-orange-500 text-xs font-bold uppercase tracking-wider rounded"
              >
                Go to YouTube
              </a>
            </div>
            
            <div className="aspect-video bg-neutral-900/40 border border-white/5 rounded-lg flex flex-col items-center justify-center p-8 text-center space-y-4">
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Streaming Widgets</span>
              <p className="text-sm text-neutral-400 font-light max-w-xs">
                Embed direct Spotify/Apple Music widgets to showcase your music catalog.
              </p>
              <a 
                href="https://open.spotify.com/artist/0b9z1lR6wYxZ1uJ5a8yK7r"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-white/10 hover:border-orange-500 hover:text-orange-500 text-xs font-bold uppercase tracking-wider rounded"
              >
                Go to Spotify
              </a>
            </div>
          </div>
        </section>

        {/* Booking & Contact info */}
        <section className="glassmorphism p-8 md:p-16 rounded-xl text-center space-y-8 animate-glow">
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold font-display uppercase text-white">Booking & PR</h2>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              For live bookings, festival lineups, press features, or general inquiries, contact our booking representative.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-md mx-auto pt-4">
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Booking Representative</h4>
                <p className="text-white font-semibold">Bryant Plympton</p>
                <a href="mailto:bry.jp10@gmail.com" className="block text-sm text-neutral-400 hover:text-white transition-colors font-mono">
                  bry.jp10@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Base Location</h4>
                <p className="text-white font-semibold">Flathead Valley</p>
                <p className="text-sm text-neutral-400">Northwest Montana, US</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
