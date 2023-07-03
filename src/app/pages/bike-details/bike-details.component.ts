import { Location } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, lastValueFrom, map, switchMap } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';


@Component({
  selector: 'bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.scss']
})
export class BikeDetailsComponent {
  constructor(
    private bikeService: BikeService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }
  @Output() back = new EventEmitter<void>()
  subscription!: Subscription

  ans = ''
  bike$!: Observable<Bike>
  bike!: Bike
  // bikeId!:string
  ngOnInit(): void {
    this.bike$ = this.route.data.pipe(map(data => data['bike']))
    console.log("bike-details mounted", this.bike$)
  }

  onBack() {
    this.router.navigateByUrl('/')
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
