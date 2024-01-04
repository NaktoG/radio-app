import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';


// Imports de entorno de desarrollo //


@Component({
  selector: 'filters',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.css']
})
export class FilteredComponent implements AfterViewInit {
  @Output('on-filters') onFiltersEmitter: EventEmitter<any> = new EventEmitter()
  public countries: any = [
    {
    country: 'Argentina',
    countryCode: 'AR'
    },
    {
      country: 'España',
      countryCode: 'ES'
    },
    {
      country: 'Estados Hundidos',
      countryCode: 'US'
    },
    {
      country: 'Rusia',
      countryCode: 'RU'
    },
    {
      country: 'Brazuca',
      countryCode: 'BR'
    },
    {
      country: 'Bolita',
      countryCode: 'BO'
    },
    {
      country: 'Paragua',
      countryCode: 'PY'
    },
    {
      country: 'Canada',
      countryCode: 'CA'
    },
    {
      country: 'Reino Hundido',
      countryCode: 'GB'
    },
    {
      country: 'Alemania',
      countryCode: 'DE'
    },
    {
      country: 'Francia',
      countryCode: 'FR'
    },
    {
      country: 'Italia',
      countryCode: 'IT'
    },
    {
      country: 'Japon',
      countryCode: 'JP'
    },
    {
      country: 'Mexico',
      countryCode: 'MX'
    },
    {
      country: 'China',
      countryCode: 'CN'
    },
    {
      country: 'Costa Rica',
      countryCode: 'CR'
    },
    {
      country: 'Andorra',
      countryCode: 'AD'
    },
    {
      country: 'Colombia',
      countryCode: 'CO'
    }


]
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
