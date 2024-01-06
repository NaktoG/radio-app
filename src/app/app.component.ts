import { AfterViewInit, Component } from '@angular/core';

// Imports de entorno de desarrollo //
import { QUERY_OBJ, URL_BASE } from './utils/api.util';
import { NavStationService } from './services/nav-station.service';
import { StationListServiceService } from './services/station-list-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Radio-App';
  public isLoaded = false;
  private url = URL_BASE;
  private queryObj = QUERY_OBJ;



  constructor(private navStationService: NavStationService, private stationListService: StationListServiceService) {}

  loadStationList() {
    fetch(this.url)
    .then(resp => resp.json())
    .then(data => {
      this.navStationService.setStationIndex(0)
      const stationList = data.map((station: any) => {
        station.name = station.name.trim()
        return station
      })
      this.stationListService.setStationList(stationList);
      this.isLoaded = true;
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

}















