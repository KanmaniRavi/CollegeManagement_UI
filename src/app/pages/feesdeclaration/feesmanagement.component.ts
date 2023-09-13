import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from 'src/app/core/services/branch.service';
import { DegreeService } from 'src/app/core/services/degree.service';
import { FeesService } from 'src/app/core/services/fees.service';
import { FeesmanageService } from 'src/app/core/services/feesdeclaration.service';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-feesmanagement',
  templateUrl: './feesmanagement.component.html',
  styleUrls: ['./feesmanagement.component.scss']
})
export class FeesmanagementComponent {
  feesHeadForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  degree: any = [];
  dataValue: any = [];
  degreeType: any;
  branchType: any;
  branch: any;
  student: any;
  isActive = true;
  fees: any;
  inputFeilds: any = [];
  feesHeads: any = [];
  ngSelectId: any = [];
  id: any;
  getId: any;
  feedeclaration: any;
  total: any;
  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute,
    private router: Router, private degreeService: DegreeService, private branchService: BranchService,
    private toastr: ServiceService, private spinnerService: NgxSpinnerService, private feesHeadMster: FeesService,
    private feesDeclarationService: FeesmanageService
  ) { }
  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.feesHeadForm = this.formBuilder.group({
      id: [null],
      degreeTypeId: [null, [Validators.required]],
      branchId: [null, [Validators.required]],
      totalAmount: [null],
      feesDeclarationDetails: this.formBuilder.array([this.feesHeadControl()]),
      status: "ACTIVE"
    });
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.id) {
        this.feesDeclarationService.feesDeclaration_Edit(this.id).subscribe(res => {
          this.branchGetId(res.data.degreeTypeId);
          // let amount = res.data.totalAmounts.replace(/,/g,'');
          this.feesHeadForm.patchValue({
            id: res.data.id,
            degreeTypeId: res.data.degreeTypeId,
            branchId: res.data.branchId,
            // totalAmounts: Number(Number(amount).toFixed(2)),
            status: "ACTIVE"
          })
          let feesHeadArr = this.feesHeadForm.get('feesDeclarationDetails') as FormArray;
          feesHeadArr.controls = [];
          res.data.feesHead.forEach((x: any) => {
            feesHeadArr.push(this.feesHeadControl());
          })
          res.data.feesHead.forEach((x: any, i: any) => {
            feesHeadArr.at(i).patchValue({
              id: x.id,
              feesHeadId: x.feesHeadId,
              amount: x.amount,
              status: 'ACTIVE'
            })
            this.totalCal();
          })
          this.feedeclaration = res.data.feesHead[0].feesDeclarationId
        })
      }
    }, 500)
    this.degreeGet();
    this.feesHeadGet();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get feesHeadArr() {
    return (this.feesHeadForm.get('feesDeclarationDetails') as FormArray);
  }
  feesHeadControl() {
    return this.formBuilder.group({
      id: [null],
      feesHeadId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      status: "ACTIVE"
    })
  }
  addInputFeild() {
    this.feesHeadArr.push(this.feesHeadControl());
  }
  removeInputFeild(id: any, index: any) {
    if (this.feesHeadArr.length == 1) {
      this.toastr.showWarning("Can't Delete One Row");
    }
    else {
      if (this.feesHeadArr.length > 1) {
        this.feesDeclarationService.declaration_HeadDelete(this.feedeclaration + '/' + id).subscribe(res => { })
        this.feesHeadArr.removeAt(index);
        this.toastr.showSuccess("Delete Successfully");
      }
    }
  }
  ngselcet(id: any, feesHead: any, index: any) {
    this.feesHeadForm.value.feesDeclarationDetails.forEach((x: any, i: any) => {
      if (x.feesHeadId == id.id && index != i) {
        feesHead.patchValue({
          feesHeadId: null
        })
      }
    })
  }
  get b() { return this.feesHeadForm.controls; };
  onSubmit() {
    this.submitted = true;
    if (this.feesHeadForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        if (this.id) {
        //   let total = this.feesHeadForm.value;
        //  total.totalAmounts = total.totalAmounts.toFixed(2);
          this.feesDeclarationService.feesDeclaration_Update(this.feesHeadForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.feesHeadForm.reset({});
            this.submitted = false;
            this.router.navigate(['app/feedeclarationlist']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }
        else if (this.getId) {
          // let total = this.feesHeadForm.value;
          // total.totalAmounts = total.totalAmounts.toFixed(2);
          this.feesDeclarationService.feesDeclaration_Update(this.feesHeadForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.feesHeadForm.reset({});
            this.submitted = false;
            this.router.navigate(['app/feedeclarationlist']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }
        else {
          this.feesDeclarationService.feesDeclaration_Create(this.feesHeadForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.feesHeadForm.reset({});
            this.submitted = false;
            this.router.navigate(['app/feedeclarationlist']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }
      }, 500);
    }
  }
  search(event: any) {
    this.branchType = event.branchName;
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesDeclarationService.search_FeesDeclaration(this.degreeType, this.branchType).subscribe(res => {
        this.toastr.showSuccess(res.message);
        this.getId = res.data[0].id;
        // let amount = res.data[0].totalAmount.replace(/,/g,'');
        this.feesHeadForm.patchValue({
          id: res.data[0].id,
          // totalAmounts: Number(Number(amount).toFixed(2)),
        })
        let feesHeadArr = this.feesHeadForm.get('feesDeclarationDetails') as FormArray;
        feesHeadArr.controls = [];
        res.data[0].feesHead.forEach((x: any) => {
          feesHeadArr.push(this.feesHeadControl());
        })
        res.data[0].feesHead.forEach((x: any, i: any) => {
          feesHeadArr.at(i).patchValue({
            id: x.id,
            feesHeadId: x.feesHeadId,
            amount: x.amount,
            status: 'ACTIVE'
          })
          this.totalCal();
        })
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  totalCal() {
    let totalAll = this.feesHeadForm.value.feesDeclarationDetails;
    console.log(totalAll);
    
    let calTotal = Number(0);
    totalAll.forEach((x: any, i: any) => {
      if ((x.amount != null && x.amount != "")) {
        // console.log(x.amount);
        
        // let amount = x.amounts.split(',').join('');
        // console.log(amount);
        
        calTotal += Number(x.amount)
      }
    })
    this.feesHeadForm.patchValue({
      totalAmount: calTotal
    })
    console.log(calTotal);
  }
  degreeGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.degreeService.degree_Get().subscribe(res => {
        this.degree = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  branchGet(id: any) {
    this.degreeType = id.degree;
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesHeadForm.patchValue({
        branchId: null
      })
      this.branchService.branchGet_degreeId(id.id).subscribe(res => {
        this.branch = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  branchGetId(id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.branchService.branchGet_degreeId(id).subscribe(res => {
        this.branch = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  feesHeadGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesHeadMster.fees_Get().subscribe(res => {
        this.feesHeads = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist']);
  }
  declaration() {
    this.router.navigate(['app/feedeclarationlist']);
  }
}
