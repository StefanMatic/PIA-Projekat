import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPersonalInformationComponent } from './cv-personal-information.component';

describe('CvPersonalInformationComponent', () => {
  let component: CvPersonalInformationComponent;
  let fixture: ComponentFixture<CvPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
