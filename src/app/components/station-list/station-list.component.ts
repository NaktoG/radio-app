import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavStationService } from 'src/app/services/nav-station.service';

@Component({
  selector: 'station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {
  @Input('station-list') stationList: any[] = [];
  // @Output('on-station-index') stationIndexEmitter: EventEmitter<number> = new EventEmitter<number>();
  public selectedIndex: number = 0;

  constructor(private navStationService: NavStationService) {

    this.navStationService.getStationIndex().subscribe( newIndex => this.selectedIndex = newIndex )

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
