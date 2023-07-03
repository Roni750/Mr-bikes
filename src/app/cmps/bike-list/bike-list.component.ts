import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.scss']
})
export class BikeListComponent {
  @Input() bikes!: Bike[] | null
  @Output() removeBike = new EventEmitter<string>()
}
