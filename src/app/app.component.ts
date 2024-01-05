import { AfterViewInit, Component } from '@angular/core';

// Imports de entorno de desarrollo //
import { QUERY_OBJ, URL_BASE } from './utils/api.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Radio-App';
  private url = URL_BASE;
  private queryObj = QUERY_OBJ;
  public stationList: any[] = [];
  public selectedStation: number = 0

  constructor() {}


  loadStationList() {
    fetch(this.url)
    .then(resp => resp.json())
    .then(data => {
      this.stationList = data.map((station: any) => {
        station.name = station.name.trim()
        return station
      })
      this.selectedStation = 0;
        console.log(this.stationList)
      })
      .catch(err => console.log(err))
  }


  setQuery(queryFilters: any){
    this.queryObj = {
      ...this.queryObj,
      ...queryFilters
    }
    let query: string = '?'
    console.log(queryFilters)
    for(let key in this.queryObj){
      const value = this.queryObj[key]
      query = `${query}${key}=${value}&`
    }
    query = query.slice(0, -1)
    this.url = URL_BASE + query;

    console.log(this.url)
    this.loadStationList();
  }

  setStationIndex(stationIndex: number) {
    console.log(stationIndex)
    this.selectedStation = stationIndex;
  }

}





//https://de1.api.radio-browser.info/json/stations/search?countrycode=MX&limit=300&offset=1&order=votes&reverse=true









