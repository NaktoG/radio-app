import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Interceptors
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { SecurityInterceptor } from './core/interceptors/security.interceptor';

/**
 * Main Application Module
 * 
 * This module follows Clean Architecture principles and Feature-Driven Development.
 * Features are lazy-loaded for better performance.
 * 
 * Security measures implemented:
 * - HTTP error handling
 * - Security headers
 * - Input sanitization
 * - XSS protection
 * - CSRF protection
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule // Must be last for wildcard route to work
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
