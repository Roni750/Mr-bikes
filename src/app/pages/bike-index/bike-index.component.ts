import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'bike-index',
  templateUrl: './bike-index.component.html',
  styleUrls: ['./bike-index.component.scss']
})
export class BikeIndexComponent implements OnInit, OnDestroy {

  constructor(private bikeService: BikeService) { }
  bikes: Bike[] | null = null
  bikes$!: Observable<Bike[]>
  subscription!: Subscription
  bikesFromAPI: Bike[] | null = null
  user: User | null = null

  ngOnInit(): void {
    this.bikes$ = this.bikeService.bikes$
  }

  onRemoveBike(bikeId: string) {
    this.bikeService.remove(bikeId).subscribe({
      error: err => {
        console.log('err:', err)
      }
    })
  }

  ngOnDestroy(): void {
    // this.subscription?.unsubscribe()
  }


}
