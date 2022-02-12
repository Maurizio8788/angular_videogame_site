import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { pipe, Subject, takeUntil } from 'rxjs';
import { APIResponse, Game } from 'src/app/model';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  games:Game[];
  private _unsubscribe:Subject<any>;
  
  constructor( 
    private _apiService:ApiService, 
    private _activatedRoute:ActivatedRoute, 
    private _router:Router,
  ) 
  {}
  
  ngOnDestroy(): void {
   this._unsubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this._unsubscribe = new Subject<any>();

    this._activatedRoute.params
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe((params:Params) => {
      if( params['game-search'] ){
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort:string, search?:string){
    this._apiService.GetGameList(sort, search)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe(
      ( gameList:APIResponse<Game> ) => {
        this.games = gameList.results;
      }
    )
  }

  openGameDetail(id:number){
    this._router.navigate(['details', id]);
  }
}
