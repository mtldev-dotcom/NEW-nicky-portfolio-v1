import React, { useId } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils/cn";

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

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
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

  return (
    <div className={cn("flex items-start space-x-2", className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          required={required}
          className="sr-only"
          aria-checked={indeterminate ? "mixed" : checked}
          {...props}
        />

        <label
          htmlFor={checkboxId}
          className={cn(
            "peer flex items-center justify-center shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer",
            sizeClasses[size],
            (checked || indeterminate) && "bg-primary text-primary-foreground border-primary",
            error && "border-destructive",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {checked && !indeterminate && (
            <Check className="h-3 w-3 text-current" />
          )}
          {indeterminate && (
            <Minus className="h-3 w-3 text-current" />
          )}
        </label>
      </div>
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
