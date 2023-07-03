import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePreviewComponent } from './bike-preview.component';

describe('BikePreviewComponent', () => {
  let component: BikePreviewComponent;
  let fixture: ComponentFixture<BikePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikePreviewComponent]
    });
    fixture = TestBed.createComponent(BikePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
