import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/core/services/common.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { StateService } from 'src/app/core/services/state.service';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent {
  stateForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  dataValue: any = [];
  id: any;
  countryIdGet: any = [];
  stateIdGet: any = [];
  countryId: any;
  stateSearch:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private NgbModal: NgbModal, private stateService: StateService,
    private services: ServiceService, private commonService: CommonService, private spinnerService: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.NgbModal.dismissAll();
    this.stateForm = this.formBuilder.group({
      id: [null],
      countryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
    });
    this.statePatch();
    this.getAllCountry();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.stateForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.stateService.state_Create(this.stateForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          this.statePatch();
          modal.dismiss('Cross click');
          this.stateForm.reset({});
          this.submitted = false;
        }, err => {
          this.services.showError(err.error.error.reason);
        })
      }, 500);
    }
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  openModal(modal: any) {
    this.countryId = null;
    this.NgbModal.open(modal, { size: 'sm' });
    this.submitted = false;
    this.stateForm.reset({});
  }
  statePatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.stateService.state_Get().subscribe(res => {
        this.dataValue = res.data;
      })
    }, 500);
  }
  getAllCountry() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.commonService.countryId_Get().subscribe(res => {
        this.countryIdGet = res.data;
      })
    }, 500);
  }
  onEdit(id: any, modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.stateService.state_Edit(id).subscribe(res => {
        this.countryId = res.data[0].countryId
        this.stateForm.patchValue({
          id: res.data[0].id,
          countryId: res.data[0].countryId,
          name: res.data[0].name,
          shortName: res.data[0].shortName
        })
      })
    }, 500);
  }
  update(modal: any) {
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        this.stateService.state_Update(this.stateForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          this.statePatch();
          modal.dismiss('Cross click');
          this.stateForm.reset({});
        }, err => {
          this.services.showError(err.error.error.reason);
        })
      }, 500);
    }
  }
  deleteModal(id: any, modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.stateService.state_Delete(this.id).subscribe(res => {
        this.services.showSuccess(res.data);
        this.statePatch();
        modal.dismiss('Cross click');
      }, err => {
        this.services.showWarning(err.error.error.reason);
      })
    }, 500);
  }
  validStateCountry() {
    if (this.countryId) {
      if (this.countryId != this.stateForm.value.id) {
        this.stateForm.patchValue({
          countryId: this.countryId,
        })
        this.services.showWarning('Country is not matched with state');
      }
    }
  }
}