
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';
import { AuthStatus } from '../../../core/enums/auth.enum';
import { StorageUtil } from '../../../shared/utils/storage.util';
import { STORAGE_KEYS } from '../../../core/constants/api.constants';
import { ValidatorUtil } from '../../../shared/utils/validator.util';
import { SanitizerUtil } from '../../../shared/utils/sanitizer.util';

/**
 * Authentication Service
 * Handles user authentication and session management
 * Uses localStorage for persistence (production should use JWT and backend)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  private authStatusSubject$ = new BehaviorSubject<AuthStatus>(AuthStatus.CHECKING);

  public currentUser$ = this.currentUserSubject$.asObservable();
  public authStatus$ = this.authStatusSubject$.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  /**
   * Check authentication status on initialization
   */
  private checkAuthStatus(): void {
    const user = StorageUtil.getItem<User>(STORAGE_KEYS.USER_DATA);
    const token = StorageUtil.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);

    if (user && token) {
      this.currentUserSubject$.next(user);
      this.authStatusSubject$.next(AuthStatus.AUTHENTICATED);
    } else {
      this.authStatusSubject$.next(AuthStatus.UNAUTHENTICATED);
    }
  }

  /**
   * Login user
   * In production, this should call a real backend API
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Sanitize inputs
    const username = SanitizerUtil.sanitizeString(credentials.username);
    const password = credentials.password; // Don't sanitize password, just validate

    // Validate inputs
    if (!ValidatorUtil.isValidUsername(username)) {
      return of({ 
        success: false, 
        message: 'Nombre de usuario inválido' 
      });
    }

    if (!ValidatorUtil.isValidPassword(password)) {
      return of({ 
        success: false, 
        message: 'Contraseña inválida (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número)' 
      });
    }

    // Simulate API call
    return of(this.simulateLogin(username, password)).pipe(
      delay(800), // Simulate network delay
      tap(response => {
        if (response.success && response.user && response.token) {
          this.setSession(response.user, response.token);
        }
      })
    );
  }

  /**
   * Register new user
   * In production, this should call a real backend API
   */
  register(data: RegisterData): Observable<AuthResponse> {
    // Sanitize inputs
    const username = SanitizerUtil.sanitizeString(data.username);
    const email = data.email ? SanitizerUtil.sanitizeEmail(data.email) : undefined;

    // Validate inputs
    if (!ValidatorUtil.isValidUsername(username)) {
      return of({ 
        success: false, 
        message: 'Nombre de usuario inválido (3-20 caracteres alfanuméricos)' 
      });
    }

    if (email && !ValidatorUtil.isValidEmail(email)) {
      return of({ 
        success: false, 
        message: 'Email inválido' 
      });
    }

    if (!ValidatorUtil.isValidPassword(data.password)) {
      return of({ 
        success: false, 
        message: 'Contraseña inválida (mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número)' 
      });
    }

    if (data.password !== data.confirmPassword) {
      return of({ 
        success: false, 
        message: 'Las contraseñas no coinciden' 
      });
    }

    // Simulate API call
    return of(this.simulateRegister(username, email)).pipe(
      delay(800),
      tap(response => {
        if (response.success && response.user && response.token) {
          this.setSession(response.user, response.token);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    StorageUtil.removeItem(STORAGE_KEYS.USER_DATA);
    StorageUtil.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    this.currentUserSubject$.next(null);
    this.authStatusSubject$.next(AuthStatus.UNAUTHENTICATED);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject$.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authStatusSubject$.value === AuthStatus.AUTHENTICATED;
  }

  /**
   * Set user session
   */
  private setSession(user: User, token: string): void {
    StorageUtil.setItem(STORAGE_KEYS.USER_DATA, user);
    StorageUtil.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    this.currentUserSubject$.next(user);
    this.authStatusSubject$.next(AuthStatus.AUTHENTICATED);
  }

  /**
   * Simulate login (for demo purposes)
   * In production, replace with real API call
   */
  private simulateLogin(username: string, password: string): AuthResponse {
    // Get stored users or create demo user
    const storedUsers = StorageUtil.getItem<any[]>('radio_app_users') || [];
    const user = storedUsers.find((u: any) => u.username === username);

    if (user && user.password === btoa(password)) {
      const authUser: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: 'user',
        createdAt: new Date(user.createdAt),
        favorites: user.favorites || [],
        preferences: user.preferences || {}
      };

      return {
        success: true,
        user: authUser,
        token: this.generateToken(),
        message: 'Login exitoso'
      };
    }

    return {
      success: false,
      message: 'Credenciales inválidas'
    };
  }

  /**
   * Simulate registration (for demo purposes)
   */
  private simulateRegister(username: string, email?: string): AuthResponse {
    const storedUsers = StorageUtil.getItem<any[]>('radio_app_users') || [];
    
    // Check if username already exists
    if (storedUsers.some((u: any) => u.username === username)) {
      return {
        success: false,
        message: 'El nombre de usuario ya existe'
      };
    }

    // Check if email already exists
    if (email && storedUsers.some((u: any) => u.email === email)) {
      return {
        success: false,
        message: 'El email ya está registrado'
      };
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      role: 'user',
      createdAt: new Date(),
      favorites: [],
      preferences: {
        theme: 'auto',
        defaultCountry: 'AR',
        autoPlay: false,
        volume: 0.7
      }
    };

    // Store user (in production, this would be in a database)
    storedUsers.push({
      ...newUser,
      password: btoa('demoPassword123') // In production, use proper hashing
    });
    StorageUtil.setItem('radio_app_users', storedUsers);

    return {
      success: true,
      user: newUser,
      token: this.generateToken(),
      message: 'Registro exitoso'
    };
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Generate auth token
   */
  private generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
}
