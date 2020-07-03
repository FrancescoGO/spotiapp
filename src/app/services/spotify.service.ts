import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor( private httpCliente: HttpClient) {

    console.log('Spotify Service Listo');

   }

  getQuery( query: string) {

    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      /* QBgcQHUEXecmk48WTCPs3HPFARw1tnZLqZ7bmr4jE5wf6GZSr7hMuFqnwt0AxNQPBvMzjkl_fyRSRizirg' */
      Authorization: 'Bearer ' + this.token
    });

    return this.httpCliente.get(url, {headers});

  }

  getNewReleases() {

    return (this.getQuery('browse/new-releases?limit=20'))
               .pipe( map( data => data[`albums`].items ));

  }

  getArtists(termino: string) {

    return (this.getQuery(`search?q=${termino}&type=artist&limit=15`))
               .pipe( map( data => data[`artists`].items ));

  }

  getTracks(termino: string) {

    return (this.getQuery(`search?q=${termino}&type=track&limit=15`))
               .pipe( map( data => data[`tracks`].items ));

  }

  getTrack(id: string) {

    return (this.getQuery(`tracks/${id}`))
               .pipe( map( data => data ));

  }

  getArtist(id: string) {

    return this.getQuery(`artists/${id}`);
              //  .pipe( map( data => data[`artists`].items ));

  }

  getTopTracks(id: string) {

    return (this.getQuery(`artists/${id}/top-tracks?country=us`))
               .pipe( map( data => data[`tracks`] ));

  }

  getToken() {
    return this.httpCliente.get('https://spotify-get-token.herokuapp.com/' +
    'spotify/06411834b41a45d8aecae3621542abbc/f46e3b74ded0490da452faf6082609a4')
   .pipe( map(  data => this.token = data[`access_token`]));
  }

}
