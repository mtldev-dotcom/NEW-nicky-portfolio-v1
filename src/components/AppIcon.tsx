import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, type LucideIcon, type LucideProps } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName | string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  ...props
}) => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name];

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default Icon;
