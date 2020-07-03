import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: []
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() opcionSeleccionada: string;

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

  verArtista( item: any, opcionSeleccionada: string ) {

    let artistaId;

    if ( opcionSeleccionada === 'Artista' ) {

      if ( item.type === 'artist' ) {
        artistaId = item.id;
      } else {
        artistaId = item.artists[0].id;
      }

      this.router.navigate(['/artist', artistaId]);

    } else {

      this.router.navigate(['/track', item.id]);

    }



  }

}
