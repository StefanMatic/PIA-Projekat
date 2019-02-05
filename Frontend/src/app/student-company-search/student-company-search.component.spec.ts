import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanySearchComponent } from './student-company-search.component';

describe('StudentCompanySearchComponent', () => {
  let component: StudentCompanySearchComponent;
  let fixture: ComponentFixture<StudentCompanySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCompanySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
