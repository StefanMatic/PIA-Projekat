import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOffersSearchComponent } from './student-offers-search.component';

describe('StudentOffersSearchComponent', () => {
  let component: StudentOffersSearchComponent;
  let fixture: ComponentFixture<StudentOffersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOffersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOffersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
