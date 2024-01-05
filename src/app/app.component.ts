import { AfterViewInit, Component } from '@angular/core';

// Imports de entorno de desarrollo //
import { URL_BASE } from './utils/api.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Radio-App';
  public url = URL_BASE;
  public stationList: any[] = [];

  constructor() {}


  loadStationList() {
    fetch(this.url)
      .then(resp => resp.json())
      .then(data => {
        this.stationList = data.map((station: any) => {
          station.name = station.name.trim()
          return station
        })
        console.log(this.stationList)
      })
      .catch(err => console.log(err))
  }


  setQuery(queryObj: any){
    console.log(queryObj)
    const countryStart  = this.url.indexOf('countrycode')
    const countryEnd = this.url.indexOf('=',countryStart)
    const countryCode = this.url.slice(countryEnd + 1, countryEnd + 3)
    this.url = this.url.replace(countryCode, queryObj.countryCode)
    console.log(countryCode)
    console.log(this.url)
    this.loadStationList()
  }

}















