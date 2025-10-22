
import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

/**
 * JWT Service
 * Handles JWT token generation and verification
 * Note: In production, token signing should be done on the backend
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  // In production, this should be an environment variable and kept secret
  // For demo purposes, we use a static secret (this would be on the backend in production)
  private readonly SECRET_KEY = 'radio-app-secret-key-change-in-production';
  private readonly TOKEN_EXPIRY = '7d'; // 7 days

  /**
   * Generate JWT token
   * Note: In production, this should be done on the backend
   */
  generateToken(payload: any): string {
    try {
      return jwt.sign(
        {
          ...payload,
          iat: Math.floor(Date.now() / 1000),
        },
        this.SECRET_KEY,
        {
          expiresIn: this.TOKEN_EXPIRY,
        }
      );
    } catch (error) {
      console.error('Error generating JWT token:', error);
      throw new Error('Failed to generate authentication token');
    }
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.SECRET_KEY);
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      return null;
    }
  }

  /**
   * Decode JWT token without verification (for reading payload)
   */
  decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
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
    
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
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
}
