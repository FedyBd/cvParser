import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobOfferModalComponent } from './add-job-offer-modal.component';

describe('AddJobOfferModalComponent', () => {
  let component: AddJobOfferModalComponent;
  let fixture: ComponentFixture<AddJobOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobOfferModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
