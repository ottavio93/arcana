import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TarotsComponent } from './tarots/tarots.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SphereComponent } from './sphere/sphere.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TarotsComponent, SphereComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
