import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
