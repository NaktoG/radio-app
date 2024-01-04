import { Component } from '@angular/core';

// Imports de entorno de desarrollo //
import { URL_BASE } from 'src/app/utils/api.util';

@Component({
  selector: 'filters',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.css']
})
export class FilteredComponent {
public url = URL_BASE;
public filterConutry = []

  constructor(){}

}
