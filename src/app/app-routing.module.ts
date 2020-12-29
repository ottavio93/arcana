import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SphereComponent } from './sphere/sphere.component';
import { TarotsComponent } from './tarots/tarots.component';
import { Tarots2Component } from './tarots2/tarots2.component';

const routes: Routes = [
  { path: 'tarots', component: TarotsComponent },
  { path: '', component: SphereComponent },
  { path: 'tarots2', component: Tarots2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
