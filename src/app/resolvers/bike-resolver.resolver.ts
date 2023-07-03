import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { BikeService } from "../services/bike.service";
import { delay } from "rxjs";


export function bikeResolver(route: ActivatedRouteSnapshot) {
    const id = route.params['id']
    return inject(BikeService).getById(id).pipe(delay(100))
}