import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/Pages/home/home.component';
import { PlayComponent } from '../components/Pages/play/play.component';
import { LoginComponent } from '../components/Pages/login/login.component';
import { RegisterComponent } from '../components/Pages/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play/:roomId', component: PlayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Завжди має бути знизу (otherwise redirect to home)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
