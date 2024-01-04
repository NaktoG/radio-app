import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';


// Imports de entorno de desarrollo //
import { Player } from '../../models/player.model';

@Component({
  selector: 'audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioPlayerComponent implements OnChanges {
  @Input('station-list') stationList: any[] = [];
  public station: any = undefined;
  public index: number = 0;
  public audio!: Player;
  public isLoading: boolean = false;
  private errorCounter: number = 0;


  constructor(){}


ngOnChanges(): void {
  console.log(this.stationList)
  this.station = this.stationList[0]
  this.createPlayer()
}

  createPlayer(){
    this.isLoading = true;
    this.audio = Player.getInstance(this.station.url_resolved, 'radioPlayer')!
    this.audio.start()
    .then( info => {
      this.errorCounter = 0;
    })
    .catch( err => {
      console.log('ERROR',err)
      console.log('this.index', this.index)
      this.errorCounter++
      if(this.errorCounter >= 5){
        this.showFatalError()
        return
      }
      if(this.index < this.stationList.length - 1){
        this.nextClick()
      }else{
        this.index = 0;
        this.station = this.stationList[this.index];
        this.createPlayer()
      }
    } )
    .finally( () => this.isLoading = false );
  }

  playPause(){
    this.audio.playPause()
  }

  showFatalError(){
    console.log('The App has EXPLOTED COMO EL ORTO!!! (y)')
  }

  nextClick() {
    this.index = this.index + 1;
    this.station =  this.stationList[this.index];
    this.createPlayer()
  }

  backClick() {
    if(this.index > 0) {
      this.index = this.index - 1;
    }else{
      this.index = this.stationList.length - 1
    }
    this.station =  this.stationList[this.index];
    this.createPlayer()
  }

}



