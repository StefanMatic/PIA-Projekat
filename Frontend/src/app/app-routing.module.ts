import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CVstudentFormComponent } from './cvstudent-form/cvstudent-form.component';
import { CompanyOfferComponent } from './company-offer/company-offer.component';
import { CompanyOfferDetailsComponent } from './company-offer-details/company-offer-details.component';
import { StudentOffersSearchComponent } from './student-offers-search/student-offers-search.component';
import { StudentCompanySearchComponent } from './student-company-search/student-company-search.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'student', component: StudentComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'listCompanies', component: CompanyListComponent },
  { path: 'makeCV', component: CVstudentFormComponent },
  { path: 'makeOffer', component: CompanyOfferComponent },
  { path: 'offerDetails', component: CompanyOfferDetailsComponent },
  { path: 'companyDetails', component: CompanyDetailsComponent },
  { path: 'searchOffers', component: StudentOffersSearchComponent },
  { path: 'searchCompany', component: StudentCompanySearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
