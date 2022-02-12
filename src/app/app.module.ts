import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPErrorsInterceptors } from './interceptors/http-errors.interceptors';
import { HTTPHeadersInterceptors } from './interceptors/http-headers.interceptors';
import { DetailsComponent } from './components/details/details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    GaugeModule.forRoot(),
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    
  ],
  declarations: [AppComponent, SearchbarComponent, HomeComponent, DetailsComponent, GameTabsComponent],
  bootstrap: [AppComponent],
  providers:[
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: HTTP_INTERCEPTORS, useClass:HTTPErrorsInterceptors,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:HTTPHeadersInterceptors,multi:true}
  ]
})
export class AppModule {}
