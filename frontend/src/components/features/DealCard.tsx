import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Clock, Tag, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/utils';
import { Deal } from '@/types';

interface DealCardProps {
    deal: Deal;
    isAuthenticated: boolean;
    userVerified: boolean;
}

const DealCard: React.FC<DealCardProps> = ({ deal, isAuthenticated, userVerified }) => {
    const isLocked = deal.isLocked && (!isAuthenticated || !userVerified);

    // Calculate days left
    const daysLeft = Math.ceil((new Date(deal.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-full"
        >
            <TiltCard className="h-full relative group rounded-xl">
                {/* Glow Effect behind the card */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition duration-500 group-hover:duration-200" />

                <Link href={`/deals/${deal._id}`} className="h-full block">
                    <Card className="h-full flex flex-col overflow-hidden bg-zinc-900/90 border-zinc-800/50 backdrop-blur-xl relative z-10 hover:bg-zinc-900 transition-colors">

                        {/* Image Section */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={deal.imageUrl || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80'}
                                alt={deal.title}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-700 group-hover:scale-110",
                                    isLocked && "blur-sm grayscale-[0.8]"
                                )}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-[10px] uppercase font-bold text-white flex items-center gap-1">
                                    <Tag className="h-3 w-3" /> {deal.category}
                                </div>
                            </div>

                            {isLocked ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[4px] border-b border-white/5">
                                    <div className="bg-zinc-900/80 p-3 rounded-full border border-white/10 mb-2 shadow-xl">
                                        <Lock className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 drop-shadow-md">
                                        Verified Founders Only
                                    </span>
                                </div>
                            ) : (
                                deal.isLocked && (
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-green-500/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-black border border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)] flex items-center gap-1">
                                            <ShieldCheck className="h-3 w-3" /> VERIFIED
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                                    {deal.title}
                                </h3>
                            </div>

                            <p className="text-sm text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
                                {deal.description}
                            </p>

                            <div className="mt-auto pt-5 border-t border-white/5 w-full flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Expires</span>
                                    <span className={cn("text-xs font-medium flex items-center gap-1.5", daysLeft < 7 ? "text-red-400" : "text-zinc-300")}>
                                        <Clock className="h-3 w-3" /> {daysLeft > 0 ? `${daysLeft} Days` : 'Expired'}
                                    </span>
                                </div>

                                <div className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300",
                                    isLocked
                                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                        : "bg-white text-black group-hover:bg-blue-500 group-hover:text-white shadow-lg shadow-white/5 group-hover:shadow-blue-500/20"
                                )}>
                                    {isLocked ? "Locked" : "Claim"}
                                    {!isLocked && <ArrowRight className="h-3 w-3" />}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            </TiltCard>
        </motion.div>
    );
};

export default DealCard;
