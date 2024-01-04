import {  AfterViewInit, Component } from '@angular/core';

// Imports de entorno de desarrollo //
import { URL_BASE} from './utils/api.util';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public title = 'Radio-App';
  public url = URL_BASE;
  public stationList: any[] = [];



  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.loadStation();
    })
  }


  loadStation() {
    // this.isLoading = true;
    fetch(this.url)
    .then( resp => resp.json() )
    .then(data => {
      this.stationList = data.map( (station: any) => {
        station.name = station.name.trim()
        return station
      } )
      console.log(this.stationList)
      // this.station = this.stationList[this.index];
      // this.createPlayer()
    })
    .catch( err => console.log(err) )
    // .finally( () => this.isLoading = false );
  }



}








