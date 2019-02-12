import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyLayoutComponent } from './admin-company-layout.component';

describe('AdminCompanyLayoutComponent', () => {
  let component: AdminCompanyLayoutComponent;
  let fixture: ComponentFixture<AdminCompanyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
