import { Component, OnInit } from '@angular/core';
import { Company } from '../models/compnay';
import { CompanyListServiceService } from '../company-list-service.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  allCompanies: Array<Company> = []
  startArrayOfCompanies: Array<Company> = []

  //promenljive za pretragu
  selectedItems = [];
  dropdownList = [];
  dropdownSettings = {};

  citySearch: string = '';
  nameSearch: string = '';

  //promenljiva za pomoc pri pretrazi
  helperArray = [];
  helperFlag: Boolean = false;

  constructor(private companyListService: CompanyListServiceService) { }

  ngOnInit() {
    this.companyListService.getAllCompanies()
      .subscribe(
        (res: Array<Company>) => {
          this.allCompanies = res
          this.startArrayOfCompanies = res
          console.log(res)
        },
        err => console.log(err)
      )

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
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSearch() {
    this.allCompanies = [];
    console.log(this.nameSearch);
    console.log(this.citySearch);

    for (let company of this.startArrayOfCompanies) {
      this.helperArray = company.activities;
      if ((this.nameSearch === '' || company.name.toLowerCase().indexOf(this.nameSearch.toLowerCase()) !== -1)
        && (this.citySearch === '' || company.city.toLowerCase().indexOf(this.citySearch.toLowerCase()) !== -1)) {
        console.log("moze dalje")
        console.log(company)
      }
      else {
        console.log("sledeca kompanija")
        console.log(company)
        continue;
      }
      if (this.selectedItems.length === 0) {
        console.log("nista nije selekovani pa ubacujemo")
        this.allCompanies.push(company);
      }
      else {
        console.log("usao sam ovde")
        console.log(this.selectedItems)
        for (let selected of this.selectedItems) {
          for (let helper of this.helperArray) {
            if (helper.item_text === selected.item_text) {
              console.log("prosle je sve ubacujemo ga")
              this.allCompanies.push(company);
              this.helperFlag = true;
              break;
            }

          }
          if (this.helperFlag) {
            console.log("Vec smo ubacili idemo dalje")
            console.log(company)
            break;
          }
        }
        this.helperFlag = false;
      }
    }
    this.helperArray = [];
  }

  onReset() {
    this.selectedItems = [];
    this.citySearch = '';
    this.nameSearch = '';
    this.allCompanies = this.startArrayOfCompanies;
  }
}
