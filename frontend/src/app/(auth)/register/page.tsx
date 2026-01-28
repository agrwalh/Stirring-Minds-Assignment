"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import api from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/register', { name, email, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify({
                    name: res.data.name,
                    email: res.data.email,
                    isVerified: res.data.isVerified
                }));
                router.push('/deals');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
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
                        <h1 className="text-3xl font-bold text-white mb-2">Join the Club</h1>
                        <p className="text-zinc-400">Get access to tools that help you scale.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Elon Musk"
                            required
                        />

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
                            Create Account
                        </Button>

                        <p className="text-center text-sm text-zinc-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-500 hover:text-blue-400">
                                Log in
                            </Link>
                        </p>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
