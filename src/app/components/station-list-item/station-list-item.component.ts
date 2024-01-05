import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'station-list-item',
  templateUrl: './station-list-item.component.html',
  styleUrls: ['./station-list-item.component.css']
})
export class StationListItemComponent implements OnInit {
  @Input('station-name') stationName: string = ''

  constructor(){}

  ngOnInit(): void {
    console.log(this.stationName)
  }

}
