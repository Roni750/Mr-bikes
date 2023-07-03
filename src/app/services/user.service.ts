import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUser() {
    return {
      name: "Valentino Rossi",
      coins: 590,
      purchaseHistory: []
    }
  }
}