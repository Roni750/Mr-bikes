import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs'
import { catchError, retry, tap, map } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { storageService } from './async-storage.service'
import { Bike, BikeFilter } from '../models/bike.model'

const ENTITY = 'bikes'

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) {
    const bikes = JSON.parse(localStorage.getItem(ENTITY) || 'null')

    if (!bikes || bikes.length === 0) {
      this._createBikes().subscribe(
        (fetchedBikes: Bike[]) => {
          const bikesWithId = fetchedBikes.map((bike) => ({
            ...bike,
            _id: this._makeId()
          }))
    
          localStorage.setItem(ENTITY, JSON.stringify(bikesWithId))
          this._bikes$.next(bikesWithId)
        },
        (err) => {
          console.error(err)
        }
      )
    } else {
      this._bikes$.next(bikes)
    }
  }

  private _bikes$ = new BehaviorSubject<Bike[]>([])
  public bikes$ = this._bikes$.asObservable()

  private _bikeFilter$ = new BehaviorSubject<BikeFilter>({ model: '' })
  public bikeFilter$ = this._bikeFilter$.asObservable()

  public query() {
    return from(storageService.query(ENTITY))
      .pipe(
        tap(bikes => {
          const filterBy = this._bikeFilter$.value
          bikes = bikes.filter(bike => bike.model.toLowerCase().includes(filterBy.model.toLowerCase()))
          this._bikes$.next(bikes)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public setBikeFilter(bikeFilter: BikeFilter) {
    this._bikeFilter$.next(bikeFilter)
    this.query().subscribe()
  }

  public fetchBikeAPI() {
    const _url = 'https://api.api-ninjas.com/v1/motorcycles?'
    const apiKey = 'gkf2u0MNjc978W/3LItwTA==bO7uXBmyW1fE8thZ'
    const headers = new HttpHeaders().set('x-api-key', apiKey)

    const params = new HttpParams().set('make', 'Suzuki')

    return this.http.get<Bike[]>(_url, { headers, params })
  }

  public getEmptyBike() {
    return { name: '' }
  }

  public remove(bikeId: string) {
    return from(storageService.remove(ENTITY, bikeId))
      .pipe(
        tap(() => {
          const bikes = this._bikes$.value
          const bikeIdx = bikes.findIndex(bike => bike._id === bikeId)
          bikes.splice(bikeIdx, 1)
          this._bikes$.next([...bikes])
          return bikeId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getById(bikeId: string): Observable<Bike> {
    return from(storageService.get(ENTITY, bikeId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )

  }


  public save(bike: Bike) {
    return bike._id ? this._edit(bike) : this._add(bike)
  }

  private _add(bike: Bike) {
    return from(storageService.post(ENTITY, bike))
      .pipe(
        tap(newBike => {
          const bikes = this._bikes$.value
          bikes.push(newBike)
          this._bikes$.next([...bikes])
          return newBike
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(bike: Bike) {
    return from(storageService.put(ENTITY, bike))
      .pipe(
        tap(updatedBike => {
          const bikes = this._bikes$.value
          const bikeIdx = bikes.findIndex(_bike => _bike._id === bike._id)
          bikes.splice(bikeIdx, 1, updatedBike)
          this._bikes$.next([...bikes])
          return updatedBike
        }),
        retry(1),
        catchError(this._handleError)
      )
  }


  public _createBikes(): Observable<Bike[]> {
    return this.fetchBikeAPI().pipe(
      tap((bikes: Bike[]) => {
        this._bikes$.next(bikes)
      }),
      catchError(this._handleError)
    )
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _makeId(length = 5) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
}
