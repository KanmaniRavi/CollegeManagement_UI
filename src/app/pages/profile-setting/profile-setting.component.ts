import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common.service';
import { FacultyService } from 'src/app/core/services/faculty.service';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  profileSettingForm!: FormGroup;
  profileForm!: FormGroup;
  submitted = false;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  isUpdate = false;
  confirmPasswordClass = 'form-control';
  user: any = [];
  id: any;
  com_State_Arr: any = [];
  com_Dist_Arr: any = [];
  perm_State_Arr: any = [];
  perm_Dist_Arr: any = [];
  countryGet: any = [];
  constructor(private NgbModal: NgbModal,
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toastr: ServiceService,
    private spinnerService: NgxSpinnerService,
    private service: ServiceService,
    private router: Router,
    private Activate: ActivatedRoute,
    private commonService: CommonService,
  ) { }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: [null],
      fullName: [Validators.required],
      email: [Validators.required],
      roleName: [Validators.required],
      phoneNum: [Validators.required],
      permanent: this.formBuilder.group({
        address: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        districtId: [null, [Validators.required]],
        postalCode: [null, [Validators.required]],
      }),
    })
    this.profileSettingForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    },
      {
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
      },
    );
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getId();
    this.getCountry();
    this.profilePatch();
  }
  getId() {
    this.id = localStorage.getItem('userid');
  }
  profilePatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.faculty_Edit(this.id).subscribe(res => {
        this.stateGetCountryId(res.data.communication.countryId, 'patchingcommunication');
        this.districtGetStateId(res.data.communication.stateId, 'patchingcommunication');
        this.stateGetCountryId(res.data.permanent.countryId, 'patchingpermanent');
        this.districtGetStateId(res.data.permanent.stateId, 'patchingpermanent');
        this.profileForm.patchValue({
          id: res.data.id,
          fullName: res.data.fullName,
          email: res.data.email,
          roleName: res.data.roleName,
          phoneNum: res.data.phoneNum,
          permanent: res.data.permanent
        })
      });
    })
  }
  get b() { return this.profileSettingForm.controls; }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  changePassword(modal: any,close:any) {
    this.submitted = true;
    if (this.profileSettingForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        this.facultyService.faculty_Password(this.profileSettingForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          this.NgbModal.open(modal, { size: 'sm' });
          this.submitted = false;
          close.dismiss('cancel click');
          this.profileSettingForm.reset({});
        }, err => {
          this.toastr.showError(err.error.error.reason);
        })
      }, 500)
    }
  }
  update() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.faculty_Profile(this.profileForm.value).subscribe(res => {
        this.toastr.showSuccess(res.data);
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.submitted = false;
    this.profileSettingForm.reset({});
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  getCountry() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.commonService.countryId_Get().subscribe(res => {
        this.countryGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  stateGetCountryId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.profileForm.controls['permanent'].patchValue({ stateId: null, districtId: null }) : this.profileForm.controls['communication'].patchValue({ stateId: null, districtId: null });
      }
      this.commonService.stateIdBY_CountryGet(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_State_Arr = res.data : this.com_State_Arr = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  districtGetStateId(id: any, type: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (type.includes('HTML')) {
        (type.includes('permanent')) ? this.profileForm.controls['permanent'].patchValue({ districtId: null }) : this.profileForm.controls['communication'].patchValue({ districtId: null });
      }
      this.commonService.state_GetDistrict(id).subscribe(res => {
        (type.includes('permanent')) ? this.perm_Dist_Arr = res.data : this.com_Dist_Arr = res.data;
      }, err => {
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
      }, err => {
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
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  login(modal:any){
    this.router.navigate(['/login']);
    modal.dismiss('cancel click');
  }
}