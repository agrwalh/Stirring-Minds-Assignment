"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Rocket, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

    if (isAuthPage) return null;

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto w-full max-w-5xl h-14 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/20 flex items-center justify-between px-6 transition-all duration-300 hover:border-white/20">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-1.5 rounded-full">
                        <Rocket className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="font-bold text-lg text-white tracking-tight">StartupDeals</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/deals" className={cn("text-sm font-medium transition-colors hover:text-white relative", pathname === '/deals' ? "text-white" : "text-zinc-400")}>
                        Explore Deals
                        {pathname === '/deals' && (
                            <motion.div layoutId="navbar-indicator" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                        )}
                    </Link>
                    {user && (
                        <Link href="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-white relative", pathname === '/dashboard' ? "text-white" : "text-zinc-400")}>
                            Dashboard
                            {pathname === '/dashboard' && (
                                <motion.div layoutId="navbar-indicator" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                            )}
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={logout} className="text-zinc-400 hover:text-red-400 h-8 w-8 p-0 rounded-full">
                                <LogOut className="h-4 w-4" />
                            </Button>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold ring-2 ring-black/50">
                                {user.name?.[0]}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white h-8 text-xs">Log in</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="h-8 text-xs bg-white text-black hover:bg-zinc-200 border-0 font-semibold rounded-full px-4">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
