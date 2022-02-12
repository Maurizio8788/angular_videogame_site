import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from '../../environment/environment';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  GetGameList( ordering:string, search?:string ) : Observable<APIResponse<Game>> {
    let params = new HttpParams();

    params = params.append( "ordering", ordering );
    if(search) params = params.append( "search", search );

    return this._http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {params})
  }

  GemeDetails( id:string ) : Observable<Game> {
    
    const gameInfo = this._http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailer = this._http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenShots = this._http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfo,
      gameTrailer,
      gameScreenShots,
    }).pipe(
      map((resp:any) => {
        return {
          ...resp["gameInfo"],
          screenshots:resp['gameScreenShots']?.results,
          trailers:resp[" gameTrailer"]?.results,
        }
      } )
    )
  }

}
