"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, Rocket, Database } from "lucide-react";

const FloatingCard = ({ icon: Icon, title, discount, className, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: 1,
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{
            y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            },
            rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            },
            opacity: { duration: 0.5, delay: 0.2 }
        }}
        className={`absolute p-4 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl flex items-center gap-4 w-64 ${className}`}
    >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
            <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
            <h4 className="text-white font-bold text-sm">{title}</h4>
            <p className="text-blue-400 text-xs font-mono">{discount}</p>
        </div>
    </motion.div>
);

export const HeroVisuals = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center perspective-1000">
            {/* Abstract Animated Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-[60px] translate-x-10 -translate-y-10" />

            {/* Floating Cards Stack */}
            <FloatingCard
                icon={Database}
                title="AWS Credits"
                discount="$5,000 in credits"
                className="z-30 top-[20%] right-[10%] md:right-[20%]"
                delay={0}
            />

            <FloatingCard
                icon={Zap}
                title="Notion Plus"
                discount="6 Months Free"
                className="z-20 top-[45%] right-[5%] md:right-[5%]"
                delay={1.5}
            />

            <FloatingCard
                icon={Shield}
                title="Linear Enterprise"
                discount="20% Off Yearly"
                className="z-10 top-[65%] right-[20%] md:right-[25%]"
                delay={0.8}
            />

            <FloatingCard
                icon={Rocket}
                title="Vercel Pro"
                discount="3 Months Free"
                className="z-0 top-[30%] left-[5%] md:left-[10%] scale-90 opacity-60 blur-[1px]"
                delay={2}
            />
        </div>
    );
};
