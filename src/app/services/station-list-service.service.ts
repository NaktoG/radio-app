import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationListServiceService {
  private stationList: any[] = []
  private stationListSubjet$: BehaviorSubject<any> = new BehaviorSubject<any>(this.stationList)

  constructor() { }

  getStationList():Observable<any>{
    return this.stationListSubjet$.asObservable()
  }

  setStationList(newStationList: any[]): void{
    this.stationList = newStationList
    this.stationListSubjet$.next(newStationList)
  }

}


