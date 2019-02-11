import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Package } from '../models/package';
import { PackageElement } from '../models/packagePackageElements';
import { PackagesService } from '../packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages-details',
  templateUrl: './packages-details.component.html',
  styleUrls: ['./packages-details.component.css']
})
export class PackagesDetailsComponent implements OnInit {
  allPackages: Package;
  patcher: PackageElement;

  myIndex = null;
  i: number;
  newPackage: any = {};

  constructor(private fb: FormBuilder,
    private packageService: PackagesService,
    private router: Router) { }

  ngOnInit() {
    this.packageService.getAllOffers().subscribe(
      (res: Package) => {
        this.allPackages = res
        console.log(this.allPackages)

        this.myIndex = localStorage.getItem('index')
        console.log(this.myIndex)
        if (this.myIndex !== null) {
          console.log("imam ind")
          this.patcher = this.allPackages.Packages[this.myIndex]

          for (this.i = 0; this.i < this.patcher.Content.length - 1; this.i++) {
            this.addContent()
          }

          this.packageForm.patchValue({
            Title: this.patcher.Title,
            Content: this.patcher.Content,
            VideoPromotion: this.patcher.VideoPromotion,
            NoLessons: this.patcher.NoLessons,
            NoWorkchops: this.patcher.NoWorkchops,
            NoPresentation: this.patcher.NoPresentation,
            Price: this.patcher.Price,
            MaxCompanies: this.patcher.MaxCompanies
          })
        }
        else
          console.log("nemam")
      },
      err => console.log(err)
    )
  }

  packageForm = this.fb.group({
    Title: ['', Validators.required],
    Content: this.fb.array([
      this.fb.control('', Validators.required),
    ]),
    VideoPromotion: ['', Validators.required],
    NoLessons: ['', Validators.required],
    NoWorkchops: ['', Validators.required],
    NoPresentation: ['', Validators.required],
    Price: ['', Validators.required],
    MaxCompanies: ['', Validators.required],
  })

  get Content() {
    return this.packageForm.get('Content') as FormArray;
  }

  addContent() {
    this.Content.push(this.fb.control('', Validators.required))
  }

  deleteContent(index) {
    this.Content.removeAt(index)
  }

  onSubmit() {
    if (this.packageForm.valid) {
      console.log("usao i preuzimam podatke")
      console.log(this.allPackages)
      this.newPackage.Title = this.packageForm.value.Title
      this.newPackage.Content = this.packageForm.value.Content
      this.newPackage.VideoPromotion = this.packageForm.value.VideoPromotion
      this.newPackage.NoLessons = this.packageForm.value.NoLessons
      this.newPackage.NoWorkchops = this.packageForm.value.NoWorkchops
      this.newPackage.NoPresentation = this.packageForm.value.NoPresentation
      this.newPackage.Price = this.packageForm.value.Price
      this.newPackage.MaxCompanies = this.packageForm.value.MaxCompanies
      this.newPackage.NoCompany = 0

      if (this.myIndex !== null) {
        this.allPackages.Packages[this.myIndex] = this.newPackage
      }
      else {
        this.allPackages.Packages.push(this.newPackage)
      }

      console.log(this.allPackages)
      console.log(this.newPackage)

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
