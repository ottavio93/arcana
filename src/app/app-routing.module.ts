import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './AUTH/signup/signup.component';
import { SphereComponent } from './sphere/sphere.component';
import { TarotsComponent } from './tarots/tarots.component';
import { Tarots2Component } from './tarots2/tarots2.component';
import { LoginComponent } from './AUTH/login/login.component';

const routes: Routes = [
  { path: 'tarots', component: TarotsComponent },
  { path: '', component: HomeComponent },
  { path: 'tarots2', component: Tarots2Component },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
