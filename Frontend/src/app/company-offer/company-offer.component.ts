import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CompanyOfferService } from '../company-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-offer',
  templateUrl: './company-offer.component.html',
  styleUrls: ['./company-offer.component.css']
})
export class CompanyOfferComponent implements OnInit {
  myOffer: any = {}

  //promenljive za rad sa padajucim menijem
  dropdownList = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder, 
    private companyService: CompanyOfferService,
    private router: Router) { }

  offerForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    deadlineDate: ['', Validators.required],
    deadlineTime: ['', Validators.required],
    selectedItems: ['', Validators.required]
  })

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Job' },
      { item_id: 2, item_text: 'Internship' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
    this.offerForm.patchValue({
      selectedItems: items
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      console.log("nesto")
      this.myOffer.username = localStorage.getItem("username")

      this.myOffer.name = this.offerForm.value.name;
      this.myOffer.description = this.offerForm.value.description;
      this.myOffer.deadlineDate = this.offerForm.value.deadlineDate;
      this.myOffer.deadlineTime = this.offerForm.value.deadlineTime;
      this.myOffer.typeOfJob = this.offerForm.value.selectedItems;

      console.log(this.myOffer)
      console.log("Saljemo dalje")
      this.companyService.makeOffer(this.myOffer).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
      this.router.navigate(['/company'])
    }
  }
}
