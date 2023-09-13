import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from 'src/app/core/services/branch.service';
import { CommonService } from 'src/app/core/services/common.service';
import { DegreeService } from 'src/app/core/services/degree.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-studreg',
  templateUrl: './studreg.component.html',
  styleUrls: ['./studreg.component.scss']
})
export class StudregComponent {
  studentForm!: FormGroup;
  submitted = false;
  isChecked: boolean = true;
  error = '';
  degreeArr: any = [];
  id: any;
  returnUrl!: string;
  gen: any = false;
  countryGet: any = [];
  com_state_arr: any = [];
  com_dist_arr: any = [];
  permanent_dist_arr: any = [];
  permanent_state_arr: any = [];
  degreeNamearr: any = [{ name: 'UG', id: 'UG' }, { name: 'PG', id: 'PG' },{name: 'OTHERS', id: 'OTHERS' }];
  degree_Get: any = [];
  branch_Get: any = [];
  coountryId: any;
  status: any = [{ name: 'ACTIVE', id: 'ACTIVE' },{ name: 'INACTIVE', id: 'INACTIVE' }];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private degreeService: DegreeService,
    private spinnerService: NgxSpinnerService,
    private branchService: BranchService,
    private studentService: StudentService,
    private toastr: ServiceService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.studentForm = this.formBuilder.group({
      id: [null],
      studentFirstName: [null, [Validators.required]],
      studentLastName: [null, [Validators.required]],
      parentName: [null, [Validators.required]],
      studentDateOfBirth: [null, [Validators.required]],
      courseFinishingYear : [null, Validators.required],
      gender: ["male", [Validators.required]],
      rollNo: [null, [Validators.required]],
      studentYearOfJoin: [null, [Validators.required]],
      emailId: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      parentNumber: [null, [Validators.required]],
      degreeType: [null, [Validators.required]],
      degreeId: [null, [Validators.required]],
      branchId: [null, [Validators.required]],
      communication: this.formBuilder.group({
        address: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        districtId: [null, [Validators.required]],
        postalCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      }),
      permanent: this.formBuilder.group({
        address: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        districtId: [null, [Validators.required]],
        postalCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      }),
      status: ["ACTIVE"],
    });
    this.getAllCountry();
    this.degreeGet();
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.id) {
        this.studentService.student_Edit(this.id).subscribe(res => {
          this.stateGetCountryId(res.data.communication.countryId, 'patchingcommunication');
          this.districtGetStateId(res.data.communication.stateId, 'patchingcommunication');
          this.stateGetCountryId(res.data.permanent.countryId, 'patchingpermanent');
          this.districtGetStateId(res.data.permanent.stateId, 'patchingpermanent');
          this.branchIdGet(res.data.degreeId);
          this.studentForm.patchValue({
            id: res.data.id,
            studentFirstName: res.data.studentFirstName,
            studentLastName: res.data.studentLastName,
            parentName: res.data.parentName,
            studentDateOfBirth: this.dateChanger(res.data.studentDateOfBirth),
            gender: res.data.gender,
            rollNo: res.data.rollNo,
            studentYearOfJoin: res.data.studentYearOfJoin,
            courseFinishingYear: res.data.courseFinishingYear,
            emailId: res.data.emailId,
            phoneNumber: res.data.phoneNumber,
            parentNumber: res.data.parentNumber,
            degreeType: res.data.degreeType,
            degreeId: res.data.degreeId,
            branchId: res.data.branchId,
            communication: res.data.communication,
            permanent: res.data.permanent,
          })
          this.filterbyid(res.data.degreeType);
        })
      }
    }, 500);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }
  dateChanger(res: any) {
    let obj = res.split('/');
    let changedDob = obj[2] + '-' + obj[1] + '-' + obj[0];
    return changedDob;
  }
  dateChangers(res: any) {
    let obj = res.split('-');
    let changedDob = obj[2] + '/' + obj[1] + '/' + obj[0];
    return changedDob;
  }
  get b() { return this.studentForm.controls; }
  get h() { return this.studentForm.controls['permanent'] as FormGroup; }
  get c() { return this.studentForm.controls['communication'] as FormGroup; }
  sameAddress(event: any) {
    if (event.target.checked == true) {
      this.stateGetCountryIdEdit(this.studentForm.value.permanent.countryId, 'fromHTMLcommunication');
      this.districtGetStateIdEdit(this.studentForm.value.permanent.stateId, 'fromHTMLcommunication');
      this.studentForm.controls['communication'].patchValue({
        address: this.studentForm.controls['permanent'].value.address,
        countryId: this.studentForm.value.permanent.countryId,
        stateId: this.studentForm.value.permanent.stateId,
        districtId: this.studentForm.value.permanent.districtId,
        postalCode: this.studentForm.value.permanent.postalCode
      })
    } else {
      this.studentForm.controls['communication'].patchValue({
        address: null,
        countryId: null,
        stateId: null,
        districtId: null,
        postalCode: null
      })
    }
  }
  onSubmit() {
    console.log(this.studentForm.value);
    
    this.submitted = true;
    let studForm = this.studentForm.value;
    studForm.studentDateOfBirth = this.dateChangers(this.studentForm.value.studentDateOfBirth);
    if (this.studentForm.invalid) {
      return;
    }
    else {
      if (this.studentForm.value.id) {
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          this.studentService.student_Update(this.studentForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.router.navigate(['app/studlist']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }, 500)
      }
      else {
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          this.studentService.student_Create(this.studentForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.router.navigate(['app/studlist']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }, 500);
      }
    }
  }
  degreeGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.degreeService.degree_Get().subscribe(res => {
        this.degree_Get = res.data;
      })
    }, 500);
  }
  branchGet(id: any) {
    console.log(id);
    this.studentForm.patchValue({ branchId: null });
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.branchService.branchGet_degreeId(id.id).subscribe(res => {
        this.branch_Get = res.data;
      })
    }, 500);
  }
  branchIdGet(id: any) {
    console.log(id);
    this.studentForm.patchValue({ branchId: null });
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.branchService.branchGet_degreeId(id).subscribe(res => {
        this.branch_Get = res.data;
      })
    }, 500);
  }
  home() {
    this.router.navigate(['app/dashboard/studentlist'])
  }

  student() {
    this.router.navigate(['app/studlist'])
  }

  getAllCountry() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.commonService.countryId_Get().subscribe(res => {
        this.countryGet = res.data;
      })
    }, 500);
  }

  stateGetCountryId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.studentForm.controls['permanent'].patchValue({ stateId: null, districtId: null }) : this.studentForm.controls['communication'].patchValue({ stateId: null, districtId: null });
      }
      this.commonService.stateIdBY_CountryGet(id).subscribe(res => {
        (type.includes('permanent')) ? this.permanent_state_arr = res.data : this.com_state_arr = res.data;
      });
    }, 500);
  }
  districtGetStateId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.studentForm.controls['permanent'].patchValue({ districtId: null }) : this.studentForm.controls['communication'].patchValue({ districtId: null });
      }
      this.commonService.state_GetDistrict(id).subscribe(res => {
        (type.includes('permanent')) ? this.permanent_dist_arr = res.data : this.com_dist_arr = res.data;
      });
    }, 500);
  }
  stateGetCountryIdEdit(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.commonService.stateIdBY_CountryGet(id).subscribe(res => {
        (type.includes('permanent')) ? this.permanent_state_arr = res.data : this.com_state_arr = res.data;
      });
    }, 500);
  }

  districtGetStateIdEdit(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.commonService.state_GetDistrict(id).subscribe(res => {
        (type.includes('permanent')) ? this.permanent_dist_arr = res.data : this.com_dist_arr = res.data;
      });
    }, 500);
  }
  filter(event: any) {
    console.log(event);
    this.studentForm.patchValue({
      degreeId:null,
      branchId:null
    })
    this.degreeArr = this.degree_Get.filter((x: any) => {
      return x.degreeType == this.studentForm.value.degreeType;
    })
    console.log(this.degreeArr);
  }
  filterbyid(event: any) {
    this.degreeArr = this.degree_Get.filter((x: any) => {
      return x.degreeType == event;
    })
  }
}