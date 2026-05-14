import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  gradient = false,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-xl',
        gradient &&
          'before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-600/20 before:to-violet-900/20 before:pointer-events-none',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
