import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface Option {
  value: string;
  label: string;
}

interface DietaryAutocompleteProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

// Intelligent search function that handles common variations and partial matches
function smartSearch(query: string, options: Option[]): Option[] {
  if (!query.trim()) return options;

  const searchTerm = query.toLowerCase().trim();

  // Common synonyms and variations people might type
  const synonyms: Record<string, string[]> = {
    gluten: ["gluten-free", "celiac", "wheat"],
    dairy: ["dairy-free", "lactose", "milk"],
    nuts: ["nut-allergy", "peanut-allergy", "tree nuts"],
    peanuts: ["peanut-allergy", "nuts"],
    egg: ["egg-allergy", "eggs"],
    soy: ["soy-allergy", "soya"],
    sugar: ["sugar-free", "diabetic", "diabetes"],
    dye: ["food-dye-sensitivity", "coloring", "artificial"],
    seeds: ["seed-allergy", "sesame", "sunflower"],
    celiac: ["gluten-free", "gluten"],
    lactose: ["dairy-free", "dairy", "milk"],
    diabetic: ["sugar-free", "diabetes", "sugar"],
  };

  return options.filter((option) => {
    const optionText = option.label.toLowerCase();
    const optionValue = option.value.toLowerCase();

    // Direct substring match in label or value
    if (optionText.includes(searchTerm) || optionValue.includes(searchTerm)) {
      return true;
    }

    // Check synonyms
    for (const [key, values] of Object.entries(synonyms)) {
      if (searchTerm.includes(key) || key.includes(searchTerm)) {
        return values.some(
          (synonym) =>
            optionText.includes(synonym) || optionValue.includes(synonym)
        );
      }
    }

    // Fuzzy matching for typos (simple Levenshtein-like approach)
    const words = optionText.split(/\s+/);
    return words.some((word) => {
      if (word.length < 3) return false;
      const similarity = calculateSimilarity(searchTerm, word);
      return similarity > 0.6; // 60% similarity threshold
    });
  });
}

// Simple similarity calculation
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const matches = shorter
    .split("")
    .filter((char, i) => char === longer[i]).length;
  return matches / longer.length;
}

export default function DietaryAutocomplete({
  options,
  value,
  onChange,
  placeholder = "Type to search dietary requirements...",
  className,
  error = false,
}: DietaryAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = smartSearch(searchQuery, options);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
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

    // Clear search and close on mobile after selection
    if (window.innerWidth < 768) {
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const handleRemovePill = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleToggleOption(filteredOptions[highlightedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        inputRef.current?.blur();
        break;
    }
  };

  const getSelectedLabels = () => {
    return value.map((v) => options.find((opt) => opt.value === v)?.label || v);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Pills */}
      {value.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {getSelectedLabels().map((label, index) => (
            <span
              key={value[index]}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-pink-100 text-pink-800 rounded-full font-medium"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemovePill(value[index])}
                className="hover:bg-pink-200 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={value.length === 0 ? placeholder : "Add more..."}
          className={cn(
            "flex h-12 w-full rounded-md border bg-white px-3 py-2 text-base ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-slate-200",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        <ChevronDown
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 transition-transform pointer-events-none",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-4 text-sm text-slate-500 text-center">
              No dietary requirements found.
              <br />
              <span className="text-xs">
                Try "gluten", "dairy", "nuts", etc.
              </span>
            </div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggleOption(option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-sm px-3 py-3 text-sm text-left hover:bg-slate-100 focus:bg-slate-100 focus:outline-none",
                    index === highlightedIndex && "bg-slate-100",
                    "min-h-[44px]" // Touch-friendly minimum height
                  )}
                  role="option"
                  aria-selected={value.includes(option.value)}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border flex-shrink-0",
                      value.includes(option.value)
                        ? "bg-pink-600 border-pink-600 text-white"
                        : "border-slate-300"
                    )}
                  >
                    {value.includes(option.value) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <span className="flex-1">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
