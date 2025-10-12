'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/utils/cn';
import Icon, { type IconName } from '../AppIcon';
import { buttonVariants } from '@/components/shadcn/ui/button';
import { type VariantProps } from 'class-variance-authority';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type IconPosition = 'left' | 'right';

const LoadingSpinner = () => (
  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      fill="currentColor"
    />
  </svg>
);

export interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    ButtonVariantProps {
  href: LinkProps['href'];
  prefetch?: boolean | null;
  loading?: boolean;
  iconName?: IconName | string | null;
  iconPosition?: IconPosition;
  iconSize?: number | null;
  fullWidth?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      prefetch,
      className,
      variant,
      size = 'default',
      loading = false,
      iconName = null,
      iconPosition = 'left',
      iconSize = null,
      fullWidth = false,
      children,
      ...rest
    },
    ref
  ) => {
    const calculatedIconSize =
      iconSize ??
      (size === 'xs'
        ? 12
        : size === 'sm'
        ? 14
        : size === 'lg'
        ? 18
        : size === 'xl'
        ? 20
        : 16);

    const baseClassName = cn(buttonVariants({ variant, size }), fullWidth && 'w-full', className);

    const renderIcon = (position: IconPosition) => {
      if (!iconName || iconPosition !== position) return null;
      const spacingClass =
        children != null && children !== false ? (position === 'left' ? 'mr-2' : 'ml-2') : undefined;
      return <Icon name={iconName} size={calculatedIconSize} className={spacingClass} />;
    };

    return (
      <Link
        href={href}
        prefetch={prefetch}
        className={baseClassName}
        ref={ref}
        data-loading={loading ? 'true' : undefined}
        {...rest}
      >
        {loading && <LoadingSpinner />}
        {renderIcon('left')}
        {children}
        {renderIcon('right')}
      </Link>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
