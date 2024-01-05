import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {
  @Input('station-list') stationList: any[] = [];
  @Output('on-station-index') stationIndexEmitter: EventEmitter<number> = new EventEmitter<number>()

  constructor() {}

  ngOnInit(): void {
    console.log(this.stationList);

  }

  sendStationIndex(stationIndex: number){
    console.log('Desde senStationIndex', stationIndex)
    this.stationIndexEmitter.emit(stationIndex)
  }



}
