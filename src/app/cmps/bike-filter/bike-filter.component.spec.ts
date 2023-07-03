import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeFilterComponent } from './bike-filter.component';

describe('BikeFilterComponent', () => {
  let component: BikeFilterComponent;
  let fixture: ComponentFixture<BikeFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikeFilterComponent]
    });
    fixture = TestBed.createComponent(BikeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
