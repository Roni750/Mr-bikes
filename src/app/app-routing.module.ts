import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeIndexComponent } from './pages/bike-index/bike-index.component';
import { AboutComponent } from './pages/about/about.component';
import { BikeDetailsComponent } from './pages/bike-details/bike-details.component';
import { BikeEditComponent } from './pages/bike-edit/bike-edit.component';
import { bikeResolver } from './resolvers/bike-resolver.resolver';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'bike/:id',
    component: BikeDetailsComponent,
    canActivate: [authGuard],
    resolve: { bike: bikeResolver }
  },
  { path: 'about', component: AboutComponent },
  { path: '', component: BikeIndexComponent, children: [
    { path: 'edit/:id', component: BikeEditComponent, resolve: {bike: bikeResolver} },
    { path: 'edit', component: BikeEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
