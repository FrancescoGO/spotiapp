import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  // paises: any[] = [];
  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  // private http: HttpClient
  constructor( private spotifyService: SpotifyService) {
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    //              .subscribe( (resp: any) => {
    //                this.paises = resp;
    //                console.log(resp);
    //              });

    this.loading = true;
    this.error   = false;

    this.getNewReleases();

  }

  ngOnInit() {
  }

  getNewReleases() {

    this.spotifyService.getToken().subscribe(async token => {
      this.spotifyService.token = await token;

      this.spotifyService.getNewReleases()
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, (errorServicio) => {
          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;
        });

    });

  }

}
