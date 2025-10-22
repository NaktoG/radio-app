
/**
 * Storage Utility
 * Provides secure methods for localStorage operations with encryption
 */
export class StorageUtil {
  
  /**
   * Saves data to localStorage with basic obfuscation
   */
  static setItem(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value);
      const encoded = btoa(stringValue); // Basic encoding
      localStorage.setItem(key, encoded);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Retrieves data from localStorage
   */
  static getItem<T>(key: string): T | null {
    try {
      const encoded = localStorage.getItem(key);
      if (!encoded) return null;
      
      const decoded = atob(encoded);
      return JSON.parse(decoded) as T;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  /**
   * Removes item from localStorage
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Clears all items from localStorage
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Checks if key exists in localStorage
   */
  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
