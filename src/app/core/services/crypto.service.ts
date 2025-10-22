
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

/**
 * Crypto Service
 * Handles password hashing and verification
 */
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly SALT_ROUNDS = 12;

  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  /**
   * Verify a password against a hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
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
   * Note: In production, you might want to use the alias directly
   * but hash sensitive data or use as part of a more complex ID generation
   */
  hashAlias(alias: string): string {
    // For demo purposes, we'll create a deterministic hash of the alias
    // In production, consider using a proper hashing algorithm
    let hash = 0;
    for (let i = 0; i < alias.length; i++) {
      const char = alias.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
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
}
