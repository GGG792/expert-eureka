import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient = false,
}) => {
  return (
    <div className="group relative p-6 rounded-2xl border border-purple-500/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-violet-900/20 rounded-2xl pointer-events-none" />
      )}
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-purple-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
