
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

/**
 * Shared Module
 * Contains commonly used components, pipes, and directives
 */
@NgModule({
  declarations: [
    SafeHtmlPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SafeHtmlPipe,
    TruncatePipe
  ]
})
export class SharedModule { }
