"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import DealCard from '@/components/features/DealCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Deal } from '@/types';

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check auth on mount
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const fetchDeals = async () => {
        setLoading(true);
        try {
            // Build query string
            const params = new URLSearchParams();
            if (keyword) params.append('keyword', keyword);
            if (category) params.append('category', category);

            const res = await api.get(`/deals?${params.toString()}`);
            setDeals(res.data.deals);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchDeals();
        }, 500);
        return () => clearTimeout(timer);
    }, [keyword, category]);

    const categories = ["All", "Cloud Services", "Analytics", "Productivity", "Marketing", "Security"];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 container mx-auto">
            {/* Header & Filters */}
            <div className="mb-16 space-y-8 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Marketplace</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-xy">Exclusive Perks</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Discover curated deals from top SaaS providers. Save thousands on your tech stack.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-8">
                    <div className="relative w-full md:w-[400px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                            className="pl-12 h-14 bg-zinc-900/50 border-zinc-800 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-lg placeholder:text-zinc-600 rounded-full shadow-lg"
                            placeholder="Search tools..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat === "All" ? "" : cat)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                                ${category === (cat === "All" ? "" : cat)
                                    ? 'bg-white text-black border-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)] scale-105'
                                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Deals Grid */}
            {loading ? (
                <div className="flex justify-center py-32">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                </div>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {deals.map((deal) => (
                        <DealCard
                            key={deal._id}
                            deal={deal}
                            isAuthenticated={!!user}
                            userVerified={user?.isVerified}
                        />
                    ))}

                    {deals.length === 0 && (
                        <div className="col-span-full text-center py-32">
                            <div className="inline-block p-6 rounded-full bg-zinc-900/50 border border-zinc-800 mb-4">
                                <Search className="h-8 w-8 text-zinc-600" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">No deals found</h3>
                            <p className="text-zinc-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
