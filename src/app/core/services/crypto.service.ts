
import { Injectable } from '@angular/core';

/**
 * Crypto Service (Browser-compatible version)
 * Handles password hashing and verification using Web Crypto API
 * Note: This is a frontend-only implementation suitable for demo/development
 * In production, authentication should be handled by a secure backend
 */
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  
  /**
   * Hash a password using Web Crypto API with PBKDF2
   * This replaces bcrypt for browser compatibility
   */
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Import the password as a key
    const key = await crypto.subtle.importKey(
      'raw',
      data,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    // Derive bits using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      key,
      256
    );
    
    // Combine salt and hash
    const hashArray = new Uint8Array(derivedBits);
    const combined = new Uint8Array(salt.length + hashArray.length);
    combined.set(salt);
    combined.set(hashArray, salt.length);
    
    // Convert to base64
    return this.arrayBufferToBase64(combined);
  }

  /**
   * Verify a password against a hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const combined = this.base64ToArrayBuffer(hash);
      
      // Extract salt and hash
      const salt = combined.slice(0, 16);
      const storedHash = combined.slice(16);
      
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      
      // Import the password as a key
      const key = await crypto.subtle.importKey(
        'raw',
        data,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );
      
      // Derive bits using PBKDF2
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        key,
        256
      );
      
      const computedHash = new Uint8Array(derivedBits);
      
      // Compare hashes
      if (computedHash.length !== storedHash.length) {
        return false;
      }
      
      for (let i = 0; i < computedHash.length; i++) {
        if (computedHash[i] !== storedHash[i]) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  /**
   * Generate a secure random token
   */
  generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Hash alias for additional security
   */
  hashAlias(alias: string): string {
    let hash = 0;
    for (let i = 0; i < alias.length; i++) {
      const char = alias.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Generate a unique user ID
   */
  generateUserId(alias: string): string {
    const timestamp = Date.now().toString(36);
    const randomPart = this.generateSecureToken().substring(0, 8);
    const aliasHash = this.hashAlias(alias);
    return `usr_${timestamp}_${aliasHash}_${randomPart}`;
  }

  /**
   * Convert ArrayBuffer to Base64
   */
  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert Base64 to ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): Uint8Array {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}
