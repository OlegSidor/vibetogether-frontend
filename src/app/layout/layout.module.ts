import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../components/Pages/home/home.component';
import { PlayComponent } from '../components/Pages/play/play.component';
import { PlayerComponent } from '../components/player/player.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PlayerComponent,
    PlayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: []
})
export class LayoutModule { }
