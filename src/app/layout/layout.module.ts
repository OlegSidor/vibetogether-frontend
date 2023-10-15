import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../components/Pages/home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: []
})
export class LayoutModule { }
