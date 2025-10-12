'use client';

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Icon, { type IconName } from '../AppIcon';
import { buttonVariants } from '@/components/shadcn/ui/button';


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

/**
 * Button with optional `asChild` support.
 *
 * When `asChild` is true and the child is a valid React element (e.g. `next/link`),
 * we clone that element, merge classes, and inject the icon/spinner + children content.
 * This avoids passing `className` to a React.Fragment, fixing the runtime warning.
 */
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
    const calculatedIconSize = iconSize ?? iconSizeMap[size] ?? 16;
    const isDisabled = disabled ?? false;

    const renderIcon = (position: IconPosition) => {
      if (!iconName || iconPosition !== position) return null;

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

    const baseClassName = cn(
      buttonVariants({ variant, size, className }),
      fullWidth && 'w-full'
    );

    // Enhanced asChild behavior: clone the single child element and inject classes + content
    if (asChild && React.isValidElement(children)) {
      const onlyChild = React.Children.only(children) as React.ReactElement<any>;
      const mergedClassName = cn(onlyChild.props?.className, baseClassName);
      const innerChildren = onlyChild.props?.children;

      const contentAsChild = (
        <>
          {loading && <LoadingSpinner />}
          {renderIcon('left')}
          {innerChildren}
          {renderIcon('right')}
        </>
      );

      return React.cloneElement(
        onlyChild,
        {
          className: mergedClassName,
          'data-loading': loading ? 'true' : undefined,
          ...props,
        },
        contentAsChild
      );
    }

    // Default native button
    return (
      <button
        className={baseClassName}
        ref={ref}
        disabled={isDisabled || loading}
        type={type}
        data-loading={loading ? 'true' : undefined}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
export default Button;
