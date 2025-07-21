import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className,
  error = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemovePill = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map((v) => options.find((opt) => opt.value === v)?.label || v);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Pills */}
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {getSelectedLabels().map((label, index) => (
            <span
              key={value[index]}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemovePill(value[index])}
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-slate-200",
          className
        )}
      >
        <span className={value.length === 0 ? "text-slate-500" : ""}>
          {value.length === 0 ? placeholder : `${value.length} selected`}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleToggleOption(option.value)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-slate-100"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border",
                    value.includes(option.value)
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-slate-300"
                  )}
                >
                  {value.includes(option.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
