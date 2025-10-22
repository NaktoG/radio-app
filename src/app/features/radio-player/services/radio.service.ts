import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Radio } from '../models/radio.model';
import { API_CONFIG } from '../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  private stationsSubject$ = new BehaviorSubject<Radio[]>([]);
  private currentStationSubject$ = new BehaviorSubject<Radio | null>(null);
  private isLoadingSubject$ = new BehaviorSubject<boolean>(false);

  public stations$ = this.stationsSubject$.asObservable();
  public currentStation$ = this.currentStationSubject$.asObservable();
  public isLoading$ = this.isLoadingSubject$.asObservable();

  constructor() {}

  /**
   * Fetch radio stations based on filters
   */
  fetchStations(filters: any = {}): Observable<Radio[]> {
    this.isLoadingSubject$.next(true);

    const params = {
      ...API_CONFIG.DEFAULT_PARAMS,
      ...filters
    };

    const queryString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}?${queryString}`;

    return new Observable<Radio[]>(observer => {
      fetch(url)
        .then(response => response.json())
        .then((data: any[]) => {
          const stations = data.map((station: any) => ({
            ...station,
            name: station.name.trim()
          })) as Radio[];
          
          this.stationsSubject$.next(stations);
          this.isLoadingSubject$.next(false);
          observer.next(stations);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching stations:', error);
          this.isLoadingSubject$.next(false);
          observer.error(error);
        });
    });
  }

  /**
   * Search stations by name
   */
  searchByName(name: string): Observable<Radio[]> {
    if (!name || name.trim().length === 0) {
      return this.stations$;
    }

    return this.stations$.pipe(
      map(stations => 
        stations.filter(station => 
          station.name.toLowerCase().includes(name.toLowerCase()) ||
          station.tags.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }

  /**
   * Set current playing station
   */
  setCurrentStation(station: Radio): void {
    this.currentStationSubject$.next(station);
  }

  /**
   * Get current stations
   */
  getStations(): Radio[] {
    return this.stationsSubject$.value;
  }

  /**
   * Get current station
   */
  getCurrentStation(): Radio | null {
    return this.currentStationSubject$.value;
  }
}