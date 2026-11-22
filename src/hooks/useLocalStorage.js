import { useState, useEffect } from "react";

/**
 * Custom hook for persisting state in browser localStorage safely.
 * @param {string} key - The localStorage storage key
 * @param {*} initialValue - Fallback value if no data is found in localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        // Ensure non-empty array if expecting array
        if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
          return initialValue;
        }
        return parsed;
      }
      // If nothing saved, persist initialValue
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
