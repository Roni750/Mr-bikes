import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { BikeIndexComponent } from './pages/bike-index/bike-index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BikeFilterComponent } from './cmps/bike-filter/bike-filter.component';
import { BikeListComponent } from './cmps/bike-list/bike-list.component';
import { BikePreviewComponent } from './cmps/bike-preview/bike-preview.component';
import { AboutComponent } from './pages/about/about.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { BikeDetailsComponent } from './pages/bike-details/bike-details.component';
import { BikeEditComponent } from './pages/bike-edit/bike-edit.component';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutHeroComponent } from './cmps/about-hero/about-hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BikeIndexComponent,
    BikeFilterComponent,
    BikeListComponent,
    BikePreviewComponent,
    AboutComponent,
    AppHeaderComponent,
    BikeDetailsComponent,
    BikeEditComponent,
    HeroComponent,
    LoginComponent,
    AboutHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
