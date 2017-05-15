import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { FooterComponent }  from './footer.component';
import { SearchComponent }  from './search.component';
import { MapComponent }  from './map.component';

import { NgFor } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  AppRoutingModule
                ],
  declarations: [ AppComponent,
                  HeaderComponent,
                  SearchComponent,
                  FooterComponent,
                  MapComponent
                ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
