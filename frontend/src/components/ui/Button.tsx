import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    onClick,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-white text-zinc-950 hover:bg-zinc-200",
        secondary: "bg-zinc-800 text-zinc-50 hover:bg-zinc-700",
        outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",
        ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
    };

    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            onClick={!isLoading ? onClick : undefined}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children as React.ReactNode}
        </motion.button>
    );
};

export default Button;
