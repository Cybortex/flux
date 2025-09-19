import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLive?: boolean;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  isLive = false,
  tier,
  className,
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const tierColors = {
    bronze: 'ring-flux-accent-gold glow',
    silver: 'ring-flux-text-secondary',
    gold: 'ring-flux-accent-gold glow',
    platinum: 'ring-flux-accent-purple glow-purple',
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden bg-flux-bg-tertiary border border-flux-border-accent/30',
          sizes[size],
          tier && 'ring-2',
          tier && tierColors[tier],
          isLive && 'ring-2 ring-flux-accent-red glow-red'
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-flux-gradient text-white font-semibold glow-cyan">
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {isLive && (
        <div className="absolute -bottom-1 -right-1 bg-flux-accent-red text-white text-xs px-1.5 py-0.5 rounded-full font-bold glow-red animate-pulse">
          LIVE
        </div>
      )}
    </div>
  );
};