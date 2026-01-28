"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.success) {
                login(res.data.token, {
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
                    isVerified: res.data.isVerified
                });
                router.push('/deals');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-zinc-400">Sign in to access exclusive startup deals.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="founder@startup.com"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" className="w-full h-11" isLoading={loading}>
                            Sign In
                        </Button>

                        <p className="text-center text-sm text-zinc-500">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-blue-500 hover:text-blue-400">
                                Register
                            </Link>
                        </p>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
