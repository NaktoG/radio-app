import { Component, OnInit } from '@angular/core';
import { RadioService } from '../../services/radio.service';
import { Radio, StationFilter } from '../../models/radio.model';

@Component({
  selector: 'app-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.css']
})
export class RadioPlayerComponent implements OnInit {
  stations: Radio[] = [];
  filteredStations: Radio[] = [];
  currentStation: Radio | null = null;
  isLoading = false;
  searchQuery = '';

  constructor(private radioService: RadioService) {}

  ngOnInit(): void {
    this.radioService.stations$.subscribe(stations => {
      this.stations = stations;
      this.filteredStations = stations;
    });

    this.radioService.currentStation$.subscribe(station => {
      this.currentStation = station;
    });

    this.radioService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });

    // Load initial stations
    this.loadStations({});
  }

  loadStations(filters: StationFilter): void {
    this.radioService.fetchStations(filters).subscribe();
  }

  onFilterChange(filters: StationFilter): void {
    this.loadStations(filters);
  }

  onStationSelect(station: Radio): void {
    this.radioService.setCurrentStation(station);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (!query) {
      this.filteredStations = this.stations;
    } else {
      this.radioService.searchByName(query).subscribe(filtered => {
        this.filteredStations = filtered;
      });
    }
  }
}