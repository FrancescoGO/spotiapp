import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';



@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];

  loading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService) {
    this.activatedRoute.params.subscribe((params) => {
      this.getArtist(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit() {
  }

  getArtist(id: string) {

    this.spotifyService.getArtist(id)
        .subscribe(artist => {
          console.log(artist);
          this.artista = artist;
          this.loading = false;
        });

  }

  getTopTracks( id: string) {

    this.spotifyService.getTopTracks( id )
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;
        });

  }

}
