import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfferDetailsComponent } from './company-offer-details.component';

describe('CompanyOfferDetailsComponent', () => {
  let component: CompanyOfferDetailsComponent;
  let fixture: ComponentFixture<CompanyOfferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyOfferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
