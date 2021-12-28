import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC']
  regions: any = [
    {'code': 'EU', 'name': 'European Union'},
    {'code': 'EFTA', 'name': 'European Free Trade Association'},
    {'code': 'CARICOM', 'name': 'Caribbean Community'},
    {'code': 'PA', 'name': 'Pacific Alliance'},
    {'code': 'AU', 'name': 'African Union'},
    {'code': 'USAN', 'name': 'Union of South American Nations'},
    {'code': 'EEU', 'name': 'Eurasian Economic Union'},
    {'code': 'AL', 'name': 'Arab League'},
    {'code': 'ASEAN', 'name': 'Association of Southeast Asian Nations'},
    {'code': 'CAIS', 'name': 'Central American Integration System'},
    {'code': 'CEFTA', 'name': 'Central European Free Trade Agreement'},
    {'code': 'NAFTA', 'name': 'North American Free Trade Agreement'},
    {'code': 'SAARC', 'name': 'South Asian Association for Regional Cooperation'}    
  ]


  regionActiva!: string
  tituloRegion!: string
  paises!: Country[]
 
  constructor(private _paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClaseCSS( region: string): string {
    return region === this.regionActiva ? 'btn btn-primary mb-2' : 'btn btn-outline-primary mb-2'
  }

  activarRegion(region: string, titulo: string) {

    if(region === this.regionActiva) { return }

    this.regionActiva = region
    this.tituloRegion = titulo
    this.paises = []
    // console.log(this.regionActiva);

    // TODO: hacer llamado al servicio
    this._paisService.buscarRegion(this.regionActiva).subscribe( paises => {
      // console.log(paises);
      
      this.paises = paises
    }, error => this.paises = [])
  }
}
