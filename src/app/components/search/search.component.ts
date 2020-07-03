import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  termino: string;
  loading: boolean;

  opcionSeleccionada = 'Artista';

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  buscar(termino: string) {

    if ( termino === '' ) { this.artistas = []; return; }

    this.loading = true;

    console.log(termino);

    this.spotifyService.getToken().subscribe(async token => {
      this.spotifyService.token = await token;

      if ( this.opcionSeleccionada === 'Artista' ) {

        this.spotifyService.getArtists(termino)
            .subscribe( (data: any) => {
              this.artistas = data;
              this.loading = false;
            });

      } else {

        this.spotifyService.getTracks(termino)
            .subscribe( (data: any) => {
              this.artistas = data;
              this.loading = false;
              console.log(data);
        });

      }

    });

  }

}
