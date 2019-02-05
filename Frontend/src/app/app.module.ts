import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { StudentFormComponent } from './student-form/student-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CompanyComponent } from './company/company.component';
import { StudentComponent } from './student/student.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyListServiceService } from './company-list-service.service';
import { StudentService } from './student.service';
import { CVstudentFormComponent } from './cvstudent-form/cvstudent-form.component';
import { CvPersonalInformationComponent } from './cv-personal-information/cv-personal-information.component';

import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { CvWorkExperienceComponent } from './cv-work-experience/cv-work-experience.component';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvPersonalSkillsComponent } from './cv-personal-skills/cv-personal-skills.component';
import { CvService } from './cv.service';
import { CompanyOfferComponent } from './company-offer/company-offer.component';
import { CompanyOfferService } from './company-offer.service';
import { CompanyOfferDetailsComponent } from './company-offer-details/company-offer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    StudentFormComponent,
    CompanyFormComponent,
    CompanyComponent,
    StudentComponent,
    CompanyListComponent,
    CVstudentFormComponent,
    CvPersonalInformationComponent,
    CvWorkExperienceComponent,
    CvEducationComponent,
    CvPersonalSkillsComponent,
    CompanyOfferComponent,
    CompanyOfferDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DlDateTimePickerDateModule
  ],
  providers: [AuthService, CompanyListServiceService, StudentService, CvService, CompanyOfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
