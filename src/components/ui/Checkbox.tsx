'use client';

import React, { useId } from "react";
import { cn } from "@/utils/cn";
import { Checkbox as BaseCheckbox } from "@/components/shadcn/ui/checkbox";

type CheckboxSize = "sm" | "default" | "lg";

const sizeClasses: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  default: "h-4 w-4",
  lg: "h-5 w-5",
};

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: CheckboxSize;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    className,
    id,
    checked = false,
    indeterminate = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    size = "default",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const { onChange, onInput, onInvalid, onToggle, onSelect, ...restProps } = props as any;

  return (
    <div className={cn("flex items-start space-x-2", className)}>
      <BaseCheckbox
        ref={ref}
        id={checkboxId}
        className={cn(
          sizeClasses[size],
          error && "border-destructive",
          disabled && "cursor-not-allowed opacity-50"
        )}
        checked={indeterminate ? 'indeterminate' : !!checked}
        disabled={disabled}
        onCheckedChange={(state) => {
          if (typeof onChange === "function") {
            const syntheticEvent = {
              target: { checked: state === true },
              currentTarget: { checked: state === true }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }
        }}
        {...restProps}
      />
      {(label || description || error) && (
        <div className="flex-1 space-y-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                error ? "text-destructive" : "text-foreground"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          {description && !error && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    className,
    children,
    label,
    description,
    error,
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <fieldset
      ref={ref}
      disabled={disabled}
      className={cn("space-y-3", className)}
      {...props}
    >
      {label && (
        <legend
          className={cn(
            "text-sm font-medium",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </legend>
      )}

      {description && !error && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}

      <div className="space-y-2">
        {children}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };
