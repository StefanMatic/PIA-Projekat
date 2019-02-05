import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CVstudentFormComponent } from './cvstudent-form/cvstudent-form.component';
import { CompanyOfferComponent } from './company-offer/company-offer.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'student', component: StudentComponent},
  {path:'company', component: CompanyComponent},
  {path:'listCompanies', component:CompanyListComponent},
  {path:'makeCV', component: CVstudentFormComponent},
  {path:'makeOffer', component: CompanyOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
