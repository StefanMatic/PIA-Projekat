import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesAdditionalDetailsComponent } from './packages-additional-details.component';

describe('PackagesAdditionalDetailsComponent', () => {
  let component: PackagesAdditionalDetailsComponent;
  let fixture: ComponentFixture<PackagesAdditionalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesAdditionalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
