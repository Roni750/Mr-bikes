import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { BikeService } from '../services/bike.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mr-bikes'

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
      this.bikeService.query()
          .pipe(take(1))
          .subscribe({
              error: err => {
                  console.log('err:', err)
              }
          })
  }
}
