import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// Imports de entorno de desarrollo //
import { AppComponent } from './app.component';
import { FilteredComponent } from './components/filtered/filtered.component';
import { AudioPlayerComponent } from './components/audioplayer/audioplayer.component';
import { FormsModule } from '@angular/forms';
import { StationListComponent } from './components/station-list/station-list.component';
import { StationListItemComponent } from './components/station-list-item/station-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FilteredComponent,
    AudioPlayerComponent,
    StationListComponent,
    StationListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
