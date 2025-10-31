import React from 'react';
import { getInitials } from '../../../utils/task.utils';

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className }) => {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const initials = getInitials(name);
  const colors = ['bg-primary-500', 'bg-success-500', 'bg-warning-500', 'bg-error-500'];
  const colorIndex = name.length % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`${sizes[size]} ${bgColor} rounded-full text-white flex items-center justify-center font-medium ${className || ''}`}
      title={name}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

