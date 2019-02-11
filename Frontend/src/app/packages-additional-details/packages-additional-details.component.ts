import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Package } from '../models/package';
import { PackageElement } from '../models/packagePackageElements';
import { Router } from '@angular/router';
import { PackagesService } from '../packages.service';
import { Additional } from '../models/packageAdditional';


@Component({
  selector: 'app-packages-additional-details',
  templateUrl: './packages-additional-details.component.html',
  styleUrls: ['./packages-additional-details.component.css']
})
export class PackagesAdditionalDetailsComponent implements OnInit {
  allPackages: Package;
  patcher: Array<Additional>;

  myIndex = null;
  i: number;
  newAdditional: any = {};

  constructor(private fb: FormBuilder,
    private packageService: PackagesService,
    private router: Router) { }


  ngOnInit() {
    this.packageService.getAllOffers().subscribe(
      (res: Package) => {
        this.allPackages = res
        this.patcher = this.allPackages.Additional

        for (this.i = 0; this.i < this.patcher.length - 1; this.i++) {
          this.addAdditional()
        }

        this.additionalForm.patchValue({
          additionalInfo: {
            Additional: this.patcher
          }
        })

      },
      err => console.log(err))
  }


  additionalForm = this.fb.group({
    additionalInfo: this.fb.group({
      Additional: this.fb.array([
        this.createItem()
      ])
    })
  })

  get Additional() {
    return this.additionalForm.get('additionalInfo.Additional') as FormArray;
  }

  addAdditional() {
    this.Additional.push(this.createItem())
  }

  deleteAdditional(index) {
    this.Additional.removeAt(index)
  }

  createItem(): FormGroup {
    return this.fb.group({
      Title: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }


  onSubmit(){
    if (this.additionalForm.valid) {
      console.log("usao i preuzimam podatke")
      console.log(this.allPackages)

      this.newAdditional = this.additionalForm.value.additionalInfo.Additional
      
      this.allPackages.Additional = this.newAdditional

      console.log(this.allPackages)
      console.log(this.newAdditional)

      
      this.packageService.updatePackages(this.allPackages).subscribe(
        res => { 
          console.log(res) 
        },
        err => console.log(err)
      )
      
      this.router.navigate(['/allPackages'])
    }
  }
}
