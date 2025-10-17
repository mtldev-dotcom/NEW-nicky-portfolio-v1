import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, type LucideIcon, type LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';

export type IconName = keyof typeof LucideIcons;

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type IconAnimation = 'none' | 'pulse' | 'spin' | 'bounce' | 'float';

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName | string;
  size?: IconSize;
  color?: string;
  className?: string;
  strokeWidth?: number;
  animation?: IconAnimation;
  loading?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

const sizeMap: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const animationVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  bounce: {
    y: [0, -4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  float: {
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  animation = 'none',
  loading = false,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...props
}) => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name];
  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  const iconProps = {
    size: iconSize,
    color: disabled ? 'gray' : color,
    strokeWidth,
    className: `transition-colors duration-200 ${className}`,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props,
  };

  if (!IconComponent) {
    return (
      <HelpCircle
        {...iconProps}
        color="gray"
        aria-label={ariaLabel || 'Unknown icon'}
      />
    );
  }

  const IconElement = (
    <IconComponent {...iconProps} />
  );

  // Apply animations if specified
  if (animation !== 'none' && !disabled) {
    return (
      <motion.div
        variants={animationVariants}
        animate={loading ? 'spin' : animation}
        className="inline-flex items-center justify-center"
        aria-hidden={ariaHidden}
      >
        {IconElement}
      </motion.div>
    );
  }

  return IconElement;
};

export default Icon;
