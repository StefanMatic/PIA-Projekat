import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { mimeType } from '../mime-type.validator';

import { Company } from '../models/compnay';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  company: any = {}
  companyRole: String = "1"

  companyForm = this.fb.group({
    accountInfo: this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    }),
    companyInfo: this.fb.group({
      name: ['', Validators.required],
      location: this.fb.group({
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      pib: ['', Validators.required],
      numOfEmployees: ['', Validators.required],
      email: ['', Validators.required],
      web: ['', Validators.required],
      selectedItems: ['', Validators.required],
      speciality: ['', Validators.required],
      image: ['', Validators.required, mimeType ]
    })
  })

  dropdownList = [];
  dropdownSettings = {};

  imagePreview:string | ArrayBuffer;

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
  }

  onSelectAll(items: any) {
    this.companyForm.patchValue({
      companyInfo: {
        selectedItems: items
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.companyForm.patchValue({
      companyInfo: {
        image: file
      }
    });
    this.companyForm.get("companyInfo.image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.company.role = this.companyRole;
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
    this.company.image = this.companyForm.value.companyInfo.image;

    this._auth.registerCompany(this.company).subscribe(
      (res:Company) => {
        console.log(res)
      },
      err => console.log(err)
    )

    this.companyForm.reset();
  }

}
