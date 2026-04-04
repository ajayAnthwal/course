"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  debounceMs = 300,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);

    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <Input
      className={className}
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      leftIcon={<FiSearch className="w-4 h-4" />}
    />
  );
}
