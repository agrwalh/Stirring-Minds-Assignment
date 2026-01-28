"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Clock } from 'lucide-react';
import api from '@/lib/api';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Claim } from '@/types';

export default function DashboardPage() {
    const router = useRouter();
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(savedUser));
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        try {
            const res = await api.get('/claims');
            setClaims(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 lg:px-8">
            {/* Profile Header - Premium Card Style */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 relative"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 shadow-2xl">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border border-white/20">
                                {user?.name?.[0]}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-zinc-900 rounded-full p-1">
                                <div className={`h-4 w-4 rounded-full border-2 border-zinc-900 ${user?.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">{user?.name}</h1>
                            <p className="text-zinc-400 font-medium">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        {user?.isVerified ? (
                            <div className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold border border-green-500/20 flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(74,222,128,0.2)]">
                                <CheckCircle className="h-4 w-4" /> Verified Founder
                            </div>
                        ) : (
                            <div className="px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-semibold border border-yellow-500/20 flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Verification Pending
                            </div>
                        )}
                        <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold mt-1">Member Since {new Date().getFullYear()}</p>
                    </div>
                </div>
            </motion.div>

            {/* Claims Section */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-2" />
                    Your Claimed Deals
                </h2>
                <span className="text-sm text-zinc-500 font-mono bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    {claims.length} Active
                </span>
            </div>

            {claims.length === 0 ? (
                <Card className="py-20 text-center bg-zinc-900/20 border-dashed border-zinc-800/50 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                        <Clock className="h-8 w-8 text-zinc-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No active claims</h3>
                    <p className="text-zinc-500 mb-6 max-w-sm mx-auto">You haven't claimed any offers yet. Explore the marketplace to find tools for your startup.</p>
                    <Button onClick={() => router.push('/deals')} className="bg-white text-black hover:bg-zinc-200">
                        Explore Marketplace
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {claims.map((claim) => (
                        <motion.div
                            key={claim._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full flex flex-col bg-zinc-900/40 border-zinc-800/50 backdrop-blur-md hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-zinc-800 relative overflow-hidden border border-white/10 shadow-lg">
                                            {claim.deal?.imageUrl && (
                                                <Image src={claim.deal.imageUrl} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{claim.deal?.title}</h3>
                                            <p className="text-xs text-zinc-400 font-medium">{claim.deal?.companyName}</p>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(16,185,129,0.3)]">Active</span>
                                </div>

                                <div className="mt-auto pt-5 border-t border-white/5 w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Redemption Code</p>
                                        <p className="text-[10px] text-zinc-600">
                                            {new Date(claim.claimedAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="group/code relative overflow-hidden bg-black/40 p-3 rounded-lg text-center font-mono text-sm tracking-[0.15em] text-zinc-300 select-all cursor-pointer hover:text-white hover:bg-black/60 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                                        {claim.deal?.discountCode || "CODE-HIDDEN"}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/code:translate-x-full transition-transform duration-700 pointer-events-none" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
