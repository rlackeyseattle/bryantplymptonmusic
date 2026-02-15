
import React from 'react';
import Link from 'next/link';

export default function EPKPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-500/30">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-neutral-950/95 border-b border-white/5 py-4 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase hover:text-orange-500 transition-colors">
                        BP <span className="text-orange-500">&</span> TS
                    </Link>
                    <Link href="/" className="text-sm font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors">
                        Back to Site
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-24">

                {/* Header / Bio Intro */}
                <section className="space-y-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
                        Electronic Press Kit
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Bryant Plympton & The Stillwaters are an Alternative-Country Rock band hailing from the rugged landscapes of Northwest Montana.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                            Download Bio (PDF)
                        </button>
                        <button className="px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                            Download Photos (ZIP)
                        </button>
                    </div>
                </section>

                {/* Stats / Quick Facts */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-12">
                    <div className="text-center space-y-2">
                        <h3 className="text-3xl font-bold text-orange-500">MT</h3>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest">Origin</p>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-3xl font-bold text-orange-500">Alt-Country</h3>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest">Genre</p>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-3xl font-bold text-orange-500">2023</h3>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest">Debut Album</p>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-3xl font-bold text-orange-500">Indie</h3>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest">Label</p>
                    </div>
                </section>

                {/* Detailed Bio */}
                <section className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6 text-neutral-300 leading-relaxed">
                        <h2 className="text-3xl font-bold uppercase text-white">The Story</h2>
                        <p>
                            Born from the fire and ice of the northern Rockies, Bryant Plympton & The Stillwaters craft a sound that is as expansive as the Big Sky itself. Merging the storytelling traditions of classic country with the raw energy of alternative rock, they have carved a unique niche in the modern music landscape.
                        </p>
                        <p>
                            Their debut album, <em className="text-white">Baptized in Fire</em>, serves as a testament to their roots. It explores themes of resilience, loss, and the untamed beauty of the American West. Bryant's distinctive vocals, paired with the band's dynamic instrumentation, create a sonic experience that is both intimate and anthemic.
                        </p>
                    </div>
                    <div className="aspect-[4/3] bg-neutral-900 border border-white/5 relative">
                        {/* Placeholder for Band Photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-bold">
                            [BAND PHOTO]
                        </div>
                    </div>
                </section>

                {/* Music / Video Embeds */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold uppercase text-white border-b border-white/10 pb-4">Latest Media</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="aspect-video bg-neutral-900 border border-white/5 flex items-center justify-center">
                            <span className="text-neutral-600 font-bold">[MUSIC VIDEO EMBED]</span>
                        </div>
                        <div className="aspect-video bg-neutral-900 border border-white/5 flex items-center justify-center">
                            <span className="text-neutral-600 font-bold">[LIVE PERFORMANCE EMBED]</span>
                        </div>
                    </div>
                </section>

                {/* Contact / Booking */}
                <section className="bg-neutral-900 p-8 md:p-12 rounded-lg text-center space-y-8">
                    <h2 className="text-3xl font-bold uppercase text-white">Booking & Management</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                        <div>
                            <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-2">Booking</h3>
                            <p className="text-white text-lg">booking@bryantplymptonmusic.com</p>
                            <p className="text-neutral-500">+1 (406) 555-0123</p>
                        </div>
                        <div>
                            <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-2">Press / PR</h3>
                            <p className="text-white text-lg">press@bryantplymptonmusic.com</p>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
