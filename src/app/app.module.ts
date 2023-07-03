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
import { AppHeaderComponent } from './app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    BikeIndexComponent,
    BikeFilterComponent,
    BikeListComponent,
    BikePreviewComponent,
    AboutComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
