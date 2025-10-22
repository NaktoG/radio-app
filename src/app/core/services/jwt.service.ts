
import { Injectable } from '@angular/core';

/**
 * JWT Service (Browser-compatible version)
 * Handles simple token generation and verification
 * Note: This is a simplified frontend-only implementation for demo purposes
 * In production, JWT signing and verification should be done on a secure backend
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly TOKEN_EXPIRY_DAYS = 7; // 7 days

  /**
   * Generate a simple token (not a real JWT, but serves the same purpose for frontend demo)
   * Note: In production, this should be done on the backend with proper JWT signing
   */
  generateToken(payload: any): string {
    try {
      const now = Math.floor(Date.now() / 1000);
      const exp = now + (this.TOKEN_EXPIRY_DAYS * 24 * 60 * 60);
      
      const tokenData = {
        ...payload,
        iat: now,
        exp: exp
      };
      
      // Create a simple token by encoding the payload as base64
      // This is NOT secure for production but works for frontend-only demo
      const jsonString = JSON.stringify(tokenData);
      const base64 = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
      
      // Add a simple signature part (not cryptographically secure, just for format)
      const signature = this.simpleHash(base64);
      
      return `${base64}.${signature}`;
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Failed to generate authentication token');
    }
  }

  /**
   * Verify token
   */
  verifyToken(token: string): any {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) {
        return null;
      }
      
      // Check if token is expired
      if (this.isTokenExpired(token)) {
        return null;
      }
      
      // Verify signature
      const parts = token.split('.');
      if (parts.length !== 2) {
        return null;
      }
      
      const [payload, signature] = parts;
      const expectedSignature = this.simpleHash(payload);
      
      if (signature !== expectedSignature) {
        return null;
      }
      
      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }

  /**
   * Decode token without verification (for reading payload)
   */
  decodeToken(token: string): any {
    try {
      // Extract payload part (before the signature)
      const payloadPart = token.split('.')[0];
      if (!payloadPart) {
        return null;
      }
      
      // Decode base64
      const jsonString = decodeURIComponent(Array.prototype.map.call(
        atob(payloadPart),
        (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  /**
   * Get token expiration date
   */
  getTokenExpiration(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    return new Date(decoded.exp * 1000);
  }

  /**
   * Simple hash function for signature (not cryptographically secure)
   * This is only for demo purposes - production should use HMAC with a secret key on backend
   */
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}
