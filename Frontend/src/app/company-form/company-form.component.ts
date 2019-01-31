import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  company:any={}

  companyForm = this.fb.group({
    accountInfo: this.fb.group({
      username: [''],
      password: [''],
    }),
    companyInfo: this.fb.group({
      name: [''],
      location: this.fb.group({
        city: [''],
        address: ['']
      }),
      pib: [''],
      numOfEmployees: [''],
      email: [''],
      web: [''],
      selectedItems:[''],
      speciality:['']
    })
  })

  dropdownList = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'IT' },
      { item_id: 2, item_text: 'Telekomunikacije' },
      { item_id: 3, item_text: 'Energetika' },
      { item_id: 4, item_text: 'NaGradevina i arhitektura' },
      { item_id: 5, item_text: 'Masinstvo' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(this.companyForm.value.companyInfo.selectedItems);
    console.log(item);
  }
  onSelectAll(items: any) {
    this.companyForm.patchValue({
      companyInfo:{
        selectedItems: items
      }
    });
    console.log(this.companyForm.value.companyInfo.selectedItems);
    console.log(items);
  }

  onSubmit(){
    this.company.role="1";
    this.company.username = this.companyForm.value.accountInfo.username;
    this.company.password = this.companyForm.value.accountInfo.password;
    this.company.name = this.companyForm.value.companyInfo.name;
    this.company.city = this.companyForm.value.companyInfo.location.city;
    this.company.address = this.companyForm.value.companyInfo.location.address;
    this.company.pib = this.companyForm.value.companyInfo.pib;
    this.company.numOfEmployees = this.companyForm.value.companyInfo.numOfEmployees;
    this.company.email = this.companyForm.value.companyInfo.email;
    this.company.web = this.companyForm.value.companyInfo.web;
    this.company.activities = this.companyForm.value.companyInfo.selectedItems;
    this.company.speciality = this.companyForm.value.companyInfo.speciality;

    console.log(this.company);
    this._auth.registerUser(this.company).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

}
