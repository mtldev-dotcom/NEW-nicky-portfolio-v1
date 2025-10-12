'use client';

import React, { useId } from "react";
import { cn } from "@/utils/cn";
import { Input as BaseInput } from "@/components/shadcn/ui/input";

type InputType = React.HTMLInputTypeAttribute;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
}

const baseInputClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const checkboxClasses =
  "h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const radioClasses =
  "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  if (type === "checkbox" || type === "radio") {
    const classes = type === "checkbox" ? checkboxClasses : radioClasses;

    return (
      <input
        type={type as InputType}
        className={cn(classes, className)}
        ref={ref}
        id={inputId}
        required={required}
        {...props}
      />
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <BaseInput
        type={type}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        id={inputId}
        required={required}
        {...props}
      />

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
  );
});

Input.displayName = "Input";

export type { InputProps };
export default Input;
