import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacultydeptService } from 'src/app/core/services/facultydept.service';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-facultydept',
  templateUrl: './facultydept.component.html',
  styleUrls: ['./facultydept.component.scss']
})
export class FacultydeptComponent {
  facultydeptForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  dataValue: any = [];
  id: any;
  facultyDeptSearch:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private NgbModal: NgbModal, private facultyService: FacultydeptService,
    private toastr: ServiceService, private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.NgbModal.dismissAll();
    this.facultydeptForm = this.formBuilder.group({
      id: [null],
      department: [null, [Validators.required]],
    });
    this.feesManagePatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.facultydeptForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.facultydeptForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.facultyService.dept_Create(this.facultydeptForm.value).subscribe(res => {
          this.toastr.showSuccess(res.data);
          this.feesManagePatch();
          modal.dismiss('Cross click');
          this.facultydeptForm.reset({});
        }, err => {
          this.toastr.showError(err.error.error.reason);
        })
      }, 500)
    }
  }
  feesManagePatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.facultyService.dept_Get().subscribe(res => {
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
      this.facultyService.dept_Edit(id).subscribe(res => {
        this.facultydeptForm.patchValue({
          id: res.data.id,
          department: res.data.department
        })
      })
    }, 500)
  }
  update(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.dept_Update(this.facultydeptForm.value).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.feesManagePatch();
        modal.dismiss('Cross click');
        this.facultydeptForm.reset({});
        this.submitted = false;
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
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
      this.facultyService.dept_Delete(this.id).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.feesManagePatch();
        modal.dismiss('Cross click');
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    }, 500)
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  openModal(modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.facultydeptForm.reset({});
    this.submitted = false;
  }
}
