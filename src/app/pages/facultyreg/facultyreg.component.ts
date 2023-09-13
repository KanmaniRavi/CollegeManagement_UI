import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common.service';
import { FacultyService } from 'src/app/core/services/faculty.service';
import { FacultydeptService } from 'src/app/core/services/facultydept.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-facultyreg',
  templateUrl: './facultyreg.component.html',
  styleUrls: ['./facultyreg.component.scss']
})
export class FacultyregComponent {
  facultyForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  isUpdate=false;
  gen: any = false;
  countryGet: any;
  com_State_Arr: any = [];
  com_Dist_Arr: any = [];
  perm_State_Arr: any = [];
  perm_Dist_Arr: any = [];
  faclutyDept: any = [];
  id: any;
  status: any = [{ name: 'ACTIVE', id: 'ACTIVE' },{ name: 'INACTIVE', id: 'INACTIVE' }];
  roleFaculty: any = [{ name: 'FACULTY', id: '0aa83123-c74a-491b-94c1-f599840b2347' },
  { name: 'ADMIN', id: '00a6aa31-43f0-4dae-ac47-ecffb16aab50' }];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private services: ServiceService, private commonService: CommonService,
    private facultyService: FacultyService, private facultyDeptService: FacultydeptService,
    private spinnerService: NgxSpinnerService,
    private toastr: ServiceService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.facultyForm = this.formBuilder.group({
      id: [null],
      registrationId: ["Fac"],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: ["male", [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      qualification: [null, [Validators.required]],
      roleId: [null, [Validators.required]],
      joiningDate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNum: [null, [Validators.required]],
      communication: this.formBuilder.group({
        address: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        districtId: [null, [Validators.required]],
        postalCode: [null, [Validators.required]],
      }),
      permanent: this.formBuilder.group({
        address: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        districtId: [null, [Validators.required]],
        postalCode: [null, [Validators.required]],
      }),
      status: ["ACTIVE" ,Validators.required]
    });
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.id) {
        this.facultyService.faculty_Edit(this.id).subscribe(res => {
          this.stateGetCountryId(res.data.communication.countryId, 'patchingcommunication');
          this.districtGetStateId(res.data.communication.stateId, 'patchingcommunication');
          this.stateGetCountryId(res.data.permanent.countryId, 'patchingpermanent');
          this.districtGetStateId(res.data.permanent.stateId, 'patchingpermanent');
          this.isUpdate=true;
          this.facultyForm.patchValue({
            id: res.data.id,
            registrationId: res.data.registrationId,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            gender: res.data.gender,
            dateOfBirth: this.dateChangers(res.data.dateOfBirth),
            departmentId: res.data.departmentId,
            qualification: res.data.qualification,
            roleId: res.data.roleId,
            joiningDate: this.dateChangers(res.data.joiningDate),
            email: res.data.email,
            phoneNum: res.data.phoneNum,
            communication: res.data.communication,
            permanent: res.data.permanent,
            status:res.data.status
          })
        })
      }
    });
    this.getCountry();
    this.facultyDeptGet();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.facultyForm.controls; };
  get p() { return this.facultyForm.controls['permanent'] as FormGroup; }
  get c() { return this.facultyForm.controls['communication'] as FormGroup; }
  sameAddress(event: any) {
    if (event.target.checked == true) {
      this.stateGetCountryIdEdit(this.facultyForm.value.permanent.countryId, 'fromHTMLcommunication');
      this.districtGetStateIdEdit(this.facultyForm.value.permanent.stateId, 'fromHTMLcommunication');
      this.facultyForm.controls['communication'].patchValue({
        address: this.facultyForm.controls['permanent'].value.address,
        countryId: this.facultyForm.value.permanent.countryId,
        stateId: this.facultyForm.value.permanent.stateId,
        districtId: this.facultyForm.value.permanent.districtId,
        postalCode: this.facultyForm.value.permanent.postalCode
      })
    } else {
      this.facultyForm.controls['communication'].patchValue({
        address: null,
        countryId: null,
        stateId: null,
        districtId: null,
        postalCode: null
      })
    }
  }
  dateChanger(res: any) {
    let dOB = res.split('-');
    let changedDOb = dOB[2] + '/' + dOB[1] + '/' + dOB[0]
    return changedDOb;
  }
  dateChangers(res: any) {
    let dOB = res.split('/');
    let changedDOb = dOB[2] + '-' + dOB[1] + '-' + dOB[0]
    return changedDOb;
  }
  onSubmit() {
    this.submitted = true;
    let obj = this.facultyForm.value;
    obj.dateOfBirth = this.dateChanger(this.facultyForm.value.dateOfBirth);
    obj.joiningDate = this.dateChanger(this.facultyForm.value.joiningDate);
    if (this.facultyForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        if (this.id) {
          this.facultyService.faculty_Update(this.facultyForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.router.navigate(['app/faculty']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }
        else {
          this.facultyService.faculty_Create(this.facultyForm.value).subscribe(res => {
            this.toastr.showSuccess(res.data);
            this.router.navigate(['app/faculty']);
          }, err => {
            this.toastr.showError(err.error.error.reason);
          })
        }
      }, 500);
    }
  }
  facultyDeptGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyDeptService.dept_Get().subscribe(res => {
        this.faclutyDept = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  faculty() {
    this.router.navigate(['app/faculty'])
  }
  getCountry() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.commonService.countryId_Get().subscribe(res => {
        this.countryGet = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  stateGetCountryId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.facultyForm.controls['permanent'].patchValue({ stateId: null, districtId: null }) : this.facultyForm.controls['communication'].patchValue({ stateId: null, districtId: null });
      }
      this.commonService.stateIdBY_CountryGet(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_State_Arr = res.data : this.com_State_Arr = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  districtGetStateId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.facultyForm.controls['permanent'].patchValue({ districtId: null }) : this.facultyForm.controls['communication'].patchValue({ districtId: null });
      }
      this.commonService.state_GetDistrict(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_Dist_Arr = res.data : this.com_Dist_Arr = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  stateGetCountryIdEdit(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // if (type.includes('HTML')) {
      //   (type.includes('permanent')) ? this.facultyForm.controls['permanent'].patchValue({ stateId: null, districtId: null }) : this.facultyForm.controls['communication'].patchValue({ stateId: null, districtId: null });
      // }
      this.commonService.stateIdBY_CountryGet(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_State_Arr = res.data : this.com_State_Arr = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  districtGetStateIdEdit(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // if (type.includes('HTML')) {
      //   (type.includes('permanent')) ? this.facultyForm.controls['permanent'].patchValue({ districtId: null }) : this.facultyForm.controls['communication'].patchValue({ districtId: null });
      // }
      this.commonService.state_GetDistrict(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_Dist_Arr = res.data : this.com_Dist_Arr = res.data;
      }, err=>{
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
}