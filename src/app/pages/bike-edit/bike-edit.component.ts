import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { BikeService } from 'src/app/services/bike.service';

@Component({
    selector: 'bike-edit',
    templateUrl: './bike-edit.component.html',
    styleUrls: ['./bike-edit.component.scss'],
})
export class BikeEditComponent implements OnInit {

    constructor(
        private bikeService: BikeService,
        private route: ActivatedRoute,
    ) { }

    router = inject(Router)

    bike = this.bikeService.getEmptyBike() as Bike
    subscription!: Subscription

    ngOnInit(): void {
        this.route.data
            .pipe(
                map(data => data['bike']),
                filter(bike => !!bike),
            )
            .subscribe(bike => this.bike = bike)

        // this.route.params.pipe(
        //     map(params => params['id']),
        //     filter(id => id),
        //     switchMap(id => this.bikeService.getById(id))
        // )
        //     .subscribe(bike => this.bike = bike)
    }


    onSaveBike() {

        this.subscription = this.bikeService.save(this.bike)
            .subscribe({
                next: () => this.router.navigateByUrl(''),
                error: err => console.log('err:', err)
            })
    }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }
}
