import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPersonalSkillsComponent } from './cv-personal-skills.component';

describe('CvPersonalSkillsComponent', () => {
  let component: CvPersonalSkillsComponent;
  let fixture: ComponentFixture<CvPersonalSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvPersonalSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPersonalSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
