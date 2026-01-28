"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles, Rocket, Globe, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Spotlight } from '@/components/ui/Spotlight';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import { HeroVisuals } from '@/components/ui/HeroVisuals';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Hero Section with Aurora/Spotlight Vibe */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden container mx-auto px-4">

        <BackgroundBeams className="z-0 pointer-events-none opacity-40" />

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md mb-8">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-medium text-zinc-300">The #1 Benefits Platform for Founders</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-8 leading-[0.9]">
              Build Faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-600 animate-gradient-xy">
                Spend Less.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
              Stop paying full price for SaaS. Access
              <span className="text-white font-semibold"> $50k+ </span>
              in credits for AWS, Notion, Linear, and more.
              Verifiable exclusivity for real founders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/deals">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
                  Get Access Now
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="ghost" className="h-14 px-8 text-lg rounded-full text-zinc-400 hover:text-white border border-white/5 hover:bg-white/5">
                  Member Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative h-[600px] w-full"
          >
            <HeroVisuals />
          </motion.div>
        </div>
      </section>

      {/* Social Proof Marquee - DISTINCT SECTION */}
      <section className="py-16 bg-zinc-950/80 backdrop-blur-md border-y border-white/5 shadow-2xl relative z-20">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Trusted by founders from YC, Techstars, and more</p>
        </div>
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </section>

      {/* Bento Grid Features - DISTINCT SECTION */}
      <section className="py-32 relative z-10 bg-zinc-900/20">
        {/* Subtle separator gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Why Top Founders Choose Us</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              We don't just give you coupons. We give you a competitive advantage with a curated stack of growth tools.
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 1 || i === 2 ? "md:col-span-1" : "md:col-span-1"}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* CTA Section - DISTINCT SECTION */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-t from-blue-900/20 to-zinc-950 border-t border-white/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to Scale?</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join 10,000+ founders saving millions in SaaS costs every year.
          </p>
          <Link href="/register">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-white text-black hover:bg-zinc-200 shadow-2xl hover:scale-105 transition-transform">
              Join the Club
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Dummy Data
const testimonials = [
  {
    quote: "This platform saved us over $10k in our first month. The AWS credits alone were worth it.",
    name: "Sarah Chen",
    title: "Founder, YC S23",
  },
  {
    quote: "Finally a benefits platform that actually verifies founders. The deals here are legit.",
    name: "Michael Ross",
    title: "CTO, DevScale",
  },
  {
    quote: "The interface is beautiful and claiming deals is instant. Highly recommended.",
    name: "Alex V.",
    title: "Indie Hacker",
  },
  {
    quote: "I switched from other platforms because purely of the curated selection. No fluff.",
    name: "Jessica L.",
    title: "CEO, FinTech Co",
  },
];

const items = [
  {
    title: "Instant Verification",
    description: "Connect your work email and get verified in seconds. No waiting for manual approval.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 items-center justify-center">
        <Shield className="h-16 w-16 text-blue-500/50" />
      </div>
    ),
    icon: <Shield className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Global Infrastructure",
    description: "Deals available in over 100+ countries. We support founders everywhere.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 items-center justify-center">
        <Globe className="h-16 w-16 text-indigo-500/50" />
      </div>
    ),
    icon: <Globe className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Secure & Exclusive",
    description: "Logged-in only access ensures that our partners can offer the deepest discounts.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 items-center justify-center">
        <Lock className="h-16 w-16 text-rose-500/50" />
      </div>
    ),
    icon: <Lock className="h-4 w-4 text-neutral-500" />,
  },
];
