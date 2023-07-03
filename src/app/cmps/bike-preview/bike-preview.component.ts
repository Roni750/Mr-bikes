import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'bike-preview',
  templateUrl: './bike-preview.component.html',
  styleUrls: ['./bike-preview.component.scss']
})
export class BikePreviewComponent {
  @Input() bike!: Bike
  @Output() removeBike = new EventEmitter<string>()


  onRemoveBike(ev: MouseEvent) {
      this.removeBike.emit(this.bike._id)
  }
}