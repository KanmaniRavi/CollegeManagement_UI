import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  countryForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  dataValue: any = [];
  id: any;
  countrySearch:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private NgbModal: NgbModal, private CountryService: CountryService,
    private toastr: ServiceService, private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.NgbModal.dismissAll();
    this.countryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
    });
    this.countryFatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.countryForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.CountryService.country_Create(this.countryForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          this.countryFatch();
          modal.dismiss('Cross click');
          this.countryForm.reset({});
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
    this.submitted = false;
    this.countryForm.reset({});
  }
  countryFatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.CountryService.country_Get().subscribe(res => {
        this.dataValue = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  onEdit(id: any, modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.CountryService.country_Edit(id).subscribe(res => {
        this.countryForm.patchValue({
          id: res.data.id,
          name: res.data.name,
          shortName: res.data.shortName,
          countryCode: res.data.countryCode
        })
      })
    }, 500);
  }
  update(modal: any) {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        this.CountryService.country_Update(this.countryForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          modal.dismiss('Cross click');
          this.countryFatch();
          this.countryForm.reset({});
          this.submitted = false;
        }, err => {
          this.toastr.showWarning(err.error.error.reason);
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
      this.CountryService.country_Delete(this.id).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.countryFatch();
        modal.dismiss('Cross click');
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    }, 500);
  }
}
