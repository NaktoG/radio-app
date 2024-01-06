import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


// Imports de entorno de desarrollo //
import { Player } from '../../models/player.model';
import { NavStationService } from '../../services/nav-station.service';
import { Observable } from 'rxjs';
import { StationListServiceService } from 'src/app/services/station-list-service.service';

@Component({
  selector: 'audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioPlayerComponent implements OnInit, OnChanges{
  public stationList: any[] = [];
  public station: any = undefined;
  public index: number = 0;
  public audio!: Player;
  public isLoading: boolean = false;
  private errorCounter: number = 0;


  constructor(private navStationService: NavStationService, private stationListService: StationListServiceService){}

  ngOnInit(): void {
    const obs: Observable<number> = this.navStationService.getStationIndex()
    obs.subscribe( newIndex => {
      this.index = newIndex
      this.station = this.stationList[this.index]
      this.createPlayer()
    })
    this.stationListService.getStationList().subscribe( newStationList => {
      this.stationList = newStationList
      this.station = this.stationList[this.index]
      this.createPlayer()
    } )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.station = this.stationList[this.index]
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
    console.log('Next',this.index)
    this.navStationService.setStationIndex(this.index)
    this.createPlayer()
  }

  backClick() {
    if(this.index > 0) {
      this.index = this.index - 1;
    }else{
      this.index = this.stationList.length - 1
    }
    this.station =  this.stationList[this.index];
    this.navStationService.setStationIndex(this.index)
    this.createPlayer()
  }

}



