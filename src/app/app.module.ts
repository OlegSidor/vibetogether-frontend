import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {LayoutRoutingModule} from './layout/layout-routing.module';
import {PreloadAllModules, RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LayoutRoutingModule,
    BrowserModule,
    LayoutModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
