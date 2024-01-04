import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// Imports de entorno de desarrollo //
import { AppComponent } from './app.component';
import { FilteredComponent } from './components/filtered/filtered.component';
import { AudioPlayerComponent } from './components/audioplayer/audioplayer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FilteredComponent,
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
