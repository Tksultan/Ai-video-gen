import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


function orderSelectedFields(fields) {
  if (!fields || fields.length === 0) return []; // Prevent infinite recursion

  return fields.reduce((acc, field) => {
      if (acc.includes(field)) return acc; // Stop duplicate recursion
      return [...acc, field];
  }, []);
}
