import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyApplicationsComponent } from './admin-company-applications.component';

describe('AdminCompanyApplicationsComponent', () => {
  let component: AdminCompanyApplicationsComponent;
  let fixture: ComponentFixture<AdminCompanyApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
