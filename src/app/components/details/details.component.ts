import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Game } from 'src/app/model';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating=0;
  gameId:string;
  game:Partial<Game>;
  private _unsubscribe:Subject<any>;

  constructor( 
    private activatedRoute:ActivatedRoute, 
    private _apiService:ApiService 
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this._unsubscribe = new Subject<any>();
    this.game = {};
    this.activatedRoute.params
    .pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(
      (params:HttpParams) =>{
        
        this.gameId = params['id'];
        this.gameDetails(this.gameId);
      }
    )
  }

  gameDetails(id:string ) :void {
    this._apiService.GemeDetails(id)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe(
      (detail:Game) => {
        console.log(detail);
        
        this.game = detail;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      }
    )
  }


  getColor( value:number ) : string {
      if( value > 75 ){
        return "#5ee432";
      } else if( value > 50 ){
        return "#fffa50";
      } else if (value > 30){
        return "#f7aa38";
      } else {
        return "#ef4655";
      }
  }

}
