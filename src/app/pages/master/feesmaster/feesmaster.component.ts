import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from 'src/app/core/services/fees.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-feesmaster',
  templateUrl: './feesmaster.component.html',
  styleUrls: ['./feesmaster.component.scss']
})
export class FeesmasterComponent {
  feesmasterForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  dataValue: any = [];
  id: any;
  ismodal: any = "nomodal";
  feeHeadSearch:any;
  yearOfStudyArr: any = [{ year: "2023", id: '2023' }, { year: '2024', id: '2024' }, { year: '2025', id: '2025' }, { year: '2026', id: '2026' }]
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private feesServices: FeesService, private NgbModal: NgbModal, private services: ServiceService,
    private spinnerService: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.NgbModal.dismissAll();
    this.feesmasterForm = this.formBuilder.group({
      id: [''],
      feesHeadName: ['', [Validators.required]],
      // status: ["ACTIVE"]
    });
    this.feesFatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.feesmasterForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.feesmasterForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.feesServices.fees_Create(this.feesmasterForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          modal.dismiss('Cross click');
          this.feesFatch();
          this.feesmasterForm.reset({});
        }, err => {
          this.services.showError(err.error.error.reason);
        })
      }, 500)
    }
  }
  feesFatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.feesServices.fees_Get().subscribe(res => {
        this.dataValue = res.data;
      }, err => {
        this.services.showError(err.error.error.reason);
      })
    }, 500)
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  openModal(modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.submitted = false;
    this.feesmasterForm.reset({});
  }
  onEdit(modal: any, id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.feesServices.fees_Edit(id).subscribe((res) => {
        this.feesmasterForm.patchValue({
          id: res.data.id,
          feesHeadName: res.data.feesHeadName,
        });
      })
    }, 500)
  }
  update(modal: any) {
    if (this.feesmasterForm.invalid) {
      return;
    }
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.feesServices.fees_Update(this.feesmasterForm.value).subscribe(res => {
        this.services.showSuccess(res.data);
        modal.dismiss('Cross click');
        this.feesFatch();
        this.feesmasterForm.reset({});
      }, err => {
        this.services.showError(err.error.error.reason);
      })
    }, 500);
  }
  deleteModel(id: any, modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.feesServices.fees_Delete(this.id).subscribe(res => {
        this.services.showSuccess(res.data);
        this.feesFatch();
        modal.dismiss('Cross click');
      }, err => {
        this.services.showWarning(err.error.error.reason);
      })
    }, 500);
  }
}
