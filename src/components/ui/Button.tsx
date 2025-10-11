'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Icon, { type IconName } from '../AppIcon';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        danger: 'bg-error text-error-foreground hover:bg-error/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        xs: 'h-8 rounded-md px-2 text-xs',
        xl: 'h-12 rounded-md px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonSize = NonNullable<ButtonVariantProps['size']>;

type IconPosition = 'left' | 'right';

const iconSizeMap: Record<ButtonSize, number> = {
  xs: 12,
  sm: 14,
  default: 16,
  lg: 18,
  xl: 20,
  icon: 16,
};

const LoadingSpinner = () => (
  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      fill="currentColor"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
  iconName?: IconName | string | null;
  iconPosition?: IconPosition;
  iconSize?: number | null;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'default',
      asChild = false,
      loading = false,
      iconName = null,
      iconPosition = 'left',
      iconSize = null,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const calculatedIconSize = iconSize ?? iconSizeMap[size] ?? 16;
    const isDisabled = disabled ?? false;
    const shouldDisable = !asChild ? isDisabled || loading : undefined;

    const renderIcon = (position: IconPosition) => {
      if (!iconName || iconPosition !== position) {
        return null;
      }

      const spacingClass =
        children != null && children !== false
          ? position === 'left'
            ? 'mr-2'
            : 'ml-2'
          : undefined;

      return <Icon name={iconName} size={calculatedIconSize} className={cn(spacingClass)} />;
    };

    const content = (
      <>
        {loading && <LoadingSpinner />}
        {renderIcon('left')}
        {children}
        {renderIcon('right')}
      </>
    );

    const baseClassName = cn(buttonVariants({ variant, size, className }), fullWidth && 'w-full');

    if (asChild) {
      return (
        <Comp className={baseClassName} ref={ref} data-loading={loading ? 'true' : undefined} {...props}>
          {content}
        </Comp>
      );
    }

    return (
      <Comp
        className={baseClassName}
        ref={ref}
        disabled={shouldDisable}
        type={type}
        data-loading={loading ? 'true' : undefined}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
export default Button;
