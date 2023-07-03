import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-root/app-routing.module';
import { AppComponent } from './app.component';
import { BikeIndexComponent } from './pages/bike-index/bike-index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BikeFilterComponent } from './bike-filter/bike-filter.component';
import { BikeListComponent } from './bike-list/bike-list.component';
import { BikePreviewComponent } from './bike-preview/bike-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    BikeIndexComponent,
    BikeFilterComponent,
    BikeListComponent,
    BikePreviewComponent,
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
