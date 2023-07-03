import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeIndexComponent } from './pages/bike-index/bike-index.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: BikeIndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
