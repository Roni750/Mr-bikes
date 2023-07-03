import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, pipe, takeUntil } from 'rxjs';
import { BikeFilter } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'bike-filter',
  templateUrl: './bike-filter.component.html',
  styleUrls: ['./bike-filter.component.scss']
})
export class BikeFilterComponent implements OnInit, OnDestroy {

  constructor(private bikeService: BikeService) { }

  bikeFilter!: BikeFilter
  destroySubject$ = new Subject()


  ngOnInit(): void {
    this.bikeService.bikeFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(bikeFilter => {
        this.bikeFilter = bikeFilter
      })
    console.log("this.bikeFilter", this.bikeFilter)
  }

  onSetFilter(value: string) {
    this.bikeService.setBikeFilter(this.bikeFilter)
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
  }

}
