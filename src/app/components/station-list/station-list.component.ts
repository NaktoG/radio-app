import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Imports de entorno de desarrollo //
import { NavStationService } from 'src/app/services/nav-station.service';
import { StationListServiceService } from 'src/app/services/station-list-service.service';

@Component({
  selector: 'station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {
  public stationList: any[] = [];
  public selectedIndex: number = 0;

  constructor(private navStationService: NavStationService, private stationListService: StationListServiceService) {

    this.navStationService.getStationIndex().subscribe( newIndex => this.selectedIndex = newIndex )
    this.stationListService.getStationList().subscribe( newStationList => this.stationList = newStationList  )

  }

  ngOnInit(): void {
    console.log(this.stationList);
  }


  /**
 * @param {string} stationIndex index de la station seleccionada
 * @returns {void} no return
 */
  sendStationIndex(stationIndex: number): void{
    console.log('Desde senStationIndex', stationIndex)
    // this.stationIndexEmitter.emit(stationIndex)
    this.navStationService.setStationIndex(stationIndex)
  }

}


