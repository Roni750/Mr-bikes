import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


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

  faArrowLeft = faArrowLeft
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
