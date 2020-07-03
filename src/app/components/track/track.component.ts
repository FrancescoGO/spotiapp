import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styles: []
})
export class TrackComponent implements OnInit {

  loading = true;
  track: any = {};

  artistas = ['Korn', 'Kreator'];

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService) {

                this.activatedRoute.params.subscribe((params) => {
                  this.getTrack(params.id);
                });

              }

  ngOnInit() {
  }

  getTrack(id: string) {

    this.spotifyService.getToken().subscribe(async token => {

      this.spotifyService.token = await token;
      this.spotifyService.getTrack(id)
          .subscribe(track => {
            this.track = track;
            this.loading = false;
            console.log(this.track);
          });

    });
  }

}
