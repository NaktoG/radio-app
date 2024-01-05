import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';


// Imports de entorno de desarrollo //
import { COUNTRIES_MOCK } from 'src/app/mocks/countries.mock';


@Component({
  selector: 'filters',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.css']
})
export class FilteredComponent implements AfterViewInit {
  @Output('on-filters') onFiltersEmitter: EventEmitter<any> = new EventEmitter()
  public countries = COUNTRIES_MOCK;
  public country: string = this.countries[ Math.floor(Math.random() * this.countries.length)  ].countryCode;

  constructor(){
    this.countries = this.countries.sort((a:any, b:any) => (a.country > b.country) ? 1 : -1)
  }

  ngAfterViewInit(): void {
    setTimeout( () => {
      this.sendFilters()
    } )
  }

  sendFilters(){
      this.onFiltersEmitter.emit({
      countryCode: this.country
    })
  }

}






