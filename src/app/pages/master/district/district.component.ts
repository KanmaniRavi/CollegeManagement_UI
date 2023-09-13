import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common.service';
import { DistrictService } from 'src/app/core/services/district.service';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
})
export class DistrictComponent {
  districtForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  dataValue: any = [];
  id: any;
  countryGet: any = [];
  stateGet: any = [];
  countryId: any;
  stateId: any;
  districtSearch:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private NgbModal: NgbModal, private toastr: ServiceService,
    private districtService: DistrictService, private CommonService: CommonService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.NgbModal.dismissAll();
    this.districtForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      stateId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      status: ["ACTIVE"]
    });
    this.getAllCountry();
    this.districtPatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.districtForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    this.districtForm.patchValue({
      status: "ACTIVE"
    })
    if (this.districtForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.districtService.district_Create(this.districtForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          this.districtPatch();
          modal.dismiss('Cross click');
          this.districtForm.reset({});
          this.submitted = false;
        }, err => {
          this.toastr.showError(err.error.error.reason);
        })
      }, 500);
    }
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.districtForm.reset({});
    this.submitted = false;
  }

  getAllCountry() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.CommonService.countryId_Get().subscribe(res => {
        this.countryGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }

  getAllStateCountry(id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.districtForm.patchValue({
        stateId: null
      })
      this.CommonService.stateIdBY_CountryGet(id).subscribe(res => {
        this.stateGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  getAllStateGetCountry(id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.CommonService.stateIdBY_CountryGet(id).subscribe(res => {
        this.stateGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  districtPatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.districtService.district_Get().subscribe(res => {
        this.dataValue = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  onEdit(modal: any, id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.submitted = true;
      this.districtService.district_Edit(id).subscribe(res => {
        this.getAllStateGetCountry(res.data[0].countryId);
        this.districtForm.patchValue({
          id: res.data[0].id,
          countryId: res.data[0].countryId,
          stateId: res.data[0].stateId,
          name: res.data[0].name,
          shortName: res.data[0].shortName,
          status: 'ACTIVE'
        })
      })
    }, 500)
  }
  update(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      if (this.districtForm.invalid) {
        return;
      }
      else {
        this.districtService.district_Update(this.districtForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          modal.dismiss('Cross click');
          this.districtPatch();
          this.districtForm.reset({});
          this.submitted = false;
        }, err => {
          this.toastr.showError(err.error.error.reason);
        })
      }
    }, 500)
  }
  deleteModal(modal: any, id: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.districtService.district_Delete(this.id).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.districtPatch();
        modal.dismiss('Cross click');
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    }, 500)
  }
}