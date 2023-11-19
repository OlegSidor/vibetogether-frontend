import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/Pages/home/home.component';
import { PlayComponent } from '../components/Pages/play/play.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play/:roomId', component: PlayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
