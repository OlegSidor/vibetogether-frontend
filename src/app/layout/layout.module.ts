import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../components/Pages/home/home.component';
import { PlayComponent } from '../components/Pages/play/play.component';
import { LoginComponent } from '../components/Pages/login/login.component';
import { RegisterComponent } from '../components/Pages/register/register.component';
import { PlayerComponent } from '../components/player/player.component';
import { RoomcreatorComponent } from '../components/roomcreator/roomcreator.component';
import { HeaderComponent } from './header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PlayerComponent,
    PlayComponent,
    LoginComponent,
    RegisterComponent,
    RoomcreatorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: []
})
export class LayoutModule { }
