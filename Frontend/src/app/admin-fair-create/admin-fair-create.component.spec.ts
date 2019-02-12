import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFairCreateComponent } from './admin-fair-create.component';

describe('AdminFairCreateComponent', () => {
  let component: AdminFairCreateComponent;
  let fixture: ComponentFixture<AdminFairCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFairCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFairCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
