'use client';

import React, { useId, useMemo, useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Input from "./Input";

type SelectValue = string | number;

interface SelectOption {
  label: string;
  value: SelectValue;
  description?: string;
  disabled?: boolean;
}

interface SelectBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "defaultValue"> {
  className?: string;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  id?: string;
  name?: string;
  onOpenChange?: (open: boolean) => void;
}

type SingleSelectProps = SelectBaseProps & {
  multiple?: false;
  value?: SelectValue;
  defaultValue?: SelectValue;
  onChange?: (value: SelectValue | undefined) => void;
};

type MultiSelectProps = SelectBaseProps & {
  multiple: true;
  value?: SelectValue[];
  defaultValue?: SelectValue[];
  onChange?: (value: SelectValue[]) => void;
};

type SelectProps = SingleSelectProps | MultiSelectProps;

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    searchable = false,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...buttonProps
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const generatedId = useId();
  const selectId = id ?? generatedId;

  const resolvedValue = useMemo(() => {
    if (multiple) {
      const arrayValue = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [];
      return arrayValue;
    }
    return (value ?? defaultValue) as SelectValue | undefined;
  }, [defaultValue, multiple, value]);

  const filteredOptions = useMemo<SelectOption[]>(() => {
    if (!searchable || searchTerm.trim() === "") {
      return options;
    }

    const normalizedTerm = searchTerm.toLowerCase();

    return options.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(normalizedTerm);
      const valueMatch = option.value?.toString().toLowerCase().includes(normalizedTerm);
      return labelMatch || valueMatch;
    });
  }, [options, searchable, searchTerm]);

  const getSelectedDisplay = (): string => {
    if (multiple) {
      const selectedValues = resolvedValue as SelectValue[];
      if (!selectedValues.length) return placeholder;
      const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));
      if (!selectedOptions.length) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions.length} items selected`;
    }

    const selectedValue = resolvedValue as SelectValue | undefined;
    if (selectedValue === undefined || selectedValue === "") {
      return placeholder;
    }
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const handleToggle = () => {
    if (disabled) return;
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    onOpenChange?.(nextIsOpen);
    if (!nextIsOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    if (multiple) {
      const currentValues = resolvedValue as SelectValue[];
      const nextValues = currentValues.includes(option.value)
        ? currentValues.filter((val) => val !== option.value)
        : [...currentValues, option.value];
      (onChange as MultiSelectProps["onChange"] | undefined)?.(nextValues);
    } else {
      (onChange as SingleSelectProps["onChange"] | undefined)?.(option.value);
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const handleClear = () => {
    if (multiple) {
      (onChange as MultiSelectProps["onChange"] | undefined)?.([]);
    } else {
      (onChange as SingleSelectProps["onChange"] | undefined)?.(undefined);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const isSelected = (optionValue: SelectValue): boolean => {
    if (multiple) {
      return (resolvedValue as SelectValue[]).includes(optionValue);
    }
    return resolvedValue === optionValue;
  };

  const hasValue = multiple
    ? (resolvedValue as SelectValue[]).length > 0
    : resolvedValue !== undefined && resolvedValue !== "";

  const hiddenSelectValue = multiple
    ? (resolvedValue as SelectValue[]).map((val) => val.toString())
    : resolvedValue !== undefined
      ? resolvedValue.toString()
      : "";

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          ref={ref}
          id={selectId}
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:ring-destructive",
            !hasValue && "text-muted-foreground"
          )}
          onClick={handleToggle}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...buttonProps}
        >
          <span className="truncate">{getSelectedDisplay()}</span>

          <div className="flex items-center gap-1">
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}

            {clearable && hasValue && !loading && (
              <span
                role="button"
                tabIndex={0}
                onMouseDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClear();
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    handleClear();
                  }
                }}
                className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clear selection"
              >
                <X className="h-3 w-3" />
              </span>
            )}

            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </div>
        </button>

        <select
          name={name}
          value={hiddenSelectValue}
          onChange={() => undefined}
          className="sr-only"
          tabIndex={-1}
          multiple={multiple}
          required={required}
        >
          {!multiple && <option value="">Select...</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white text-black border border-border rounded-md shadow-md">
            {searchable && (
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-8"
                  />
                </div>
              </div>
            )}

            <div className="py-1 max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {searchTerm ? "No options found" : "No options available"}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                      isSelected(option.value) && "bg-primary text-primary-foreground",
                      option.disabled && "pointer-events-none opacity-50"
                    )}
                    onClick={() => !option.disabled && handleOptionSelect(option)}
                    role="option"
                    aria-selected={isSelected(option.value)}
                  >
                    <span className="flex-1">{option.label}</span>
                    {multiple && isSelected(option.value) && (
                      <Check className="h-4 w-4" />
                    )}
                    {option.description && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {option.description}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {description && !error && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export type { SelectOption, SelectProps, SelectValue };
export default Select;
