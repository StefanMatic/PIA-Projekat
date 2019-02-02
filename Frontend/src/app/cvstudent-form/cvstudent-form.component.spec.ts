import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVstudentFormComponent } from './cvstudent-form.component';

describe('CVstudentFormComponent', () => {
  let component: CVstudentFormComponent;
  let fixture: ComponentFixture<CVstudentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVstudentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVstudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
