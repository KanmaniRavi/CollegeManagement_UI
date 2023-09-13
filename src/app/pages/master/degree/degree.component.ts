import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DegreeService } from 'src/app/core/services/degree.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent {
  degreeForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  degreeValue: any = [];
  result = false;
  degreeNamearr: any = [{ name: 'UG', id: 'UG' }, { name: 'PG', id: 'PG' },{ name: 'OTHERS', id: 'OTHERS' } ];
  id: any;
  degreeSearch:any;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private services: ServiceService,
    private degreeSerivice: DegreeService, private NgbModal: NgbModal, private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.NgbModal.dismissAll();
    this.degreeForm = this.formBuilder.group({
      id: [null],
      degreeType: [null, [Validators.required]],
      degree: [null, [Validators.required]],
      status: ["ACTIVE"]
    });
    this.degreePatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.degreeForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    this.degreeForm.patchValue({
      status: "ACTIVE"
    })
    if (this.degreeForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.degreeSerivice.degree_Post(this.degreeForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          this.degreePatch();
          modal.dismiss('Cross click');
          this.degreeForm.reset({});
          this.submitted = false;
        }, err => {
          this.services.showError(err.error.error.reason);
        })
      }, 500);
    }
  }
  degreePatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.degreeSerivice.degree_Get().subscribe(res => {
        this.degreeValue = res.data;
      }, err => {
        this.services.showError(err.error.error.reason);
      })
    }, 500);
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist']);
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.submitted = false;
    this.degreeForm.reset({});
  }
  onEdit(modal: any, id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.degreeSerivice.degree_Edit(id).subscribe((res) => {
        this.degreeForm.patchValue({
          id: res.data.id,
          degree: res.data.degree,
          degreeType: res.data.degreeType,
          status: res.data.status
        })
      })
    }, 500);
  }
  update(modal: any) {
    this.submitted = true;
    if (this.degreeForm.invalid) {
      return;
    }
    this.degreeSerivice.degreeUpdate(this.degreeForm.value).subscribe((res) => {
      this.services.showSuccess(res.data);
      modal.dismiss('Cross click');
      this.degreePatch();
      this.degreeForm.reset({});
      this.submitted = false;
    }, (err) => {
      this.services.showError(err.error.error.reason);
    })
  }
  deleteModel(id: any, modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.degreeSerivice.degree_Delete(this.id).subscribe(res => {
        this.services.showSuccess(res.data);
        this.degreePatch();
        modal.dismiss('Cross click');
      }, err => {
        this.services.showWarning(err.error.error.reason);
      })
    }, 500);
  }
}