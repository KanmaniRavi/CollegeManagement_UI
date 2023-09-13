import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DegreeService } from 'src/app/core/services/degree.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent {
  branchForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  branchValue: any = [];
  id: any;
  degree_Get: any = [];
  degree: any = [];
  degreeArr:any=[];
  branchSearch:any;
  degreeNamearr: any = [{ name: 'UG', id: 'UG' }, { name: 'PG', id: 'PG' },{ name: 'OTHERS', id: 'OTHERS' }]
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private NgbModal: NgbModal, private branchService: BranchService, private services: ServiceService,
    private degreeService: DegreeService, private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.NgbModal.dismissAll();
    this.branchForm = this.formBuilder.group({
      id: [''],
      degreeTypeId: ['', [Validators.required]],
      degreeType: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      branchShortName: ['', [Validators.required]],
      // status:['ACTIVE']
    });
    this.branchFatch();
    this.degreeGet();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  get b() { return this.branchForm.controls; }
  onSubmit(modal: any) {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.branchService.branch_Create(this.branchForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          this.branchFatch();
          modal.dismiss('Cross click');
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
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.submitted = false;
    this.branchForm.reset({});
  }
  branchFatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.branchService.branch_Get().subscribe(res => {
        this.branchValue = res.data;
      }, err => {
        this.services.showError(err.error.error.reason);
      })
    }, 500);
  }
  degreeGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.degreeService.degree_Get().subscribe(res => {
        this.degree_Get = res.data;
      },err=>{
        this.services.showError(err.error.error.reason);
      })
    }, 500);
  }
  onEdit(id: any, modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.NgbModal.open(modal, { size: 'sm' });
      this.branchService.branch_Edit(id).subscribe((res) => {
        this.branchForm.patchValue({
          id: res.data[0].id,
          degreeTypeId: res.data[0].degreeTypeId,
          degreeType: res.data[0].degreeName,
          branchName: res.data[0].branchName,
          branchShortName: res.data[0].branchShortName,
          status: 'ACTIVE'
        })
        this.filterbyid(res.data[0].degreeName);
      })
    }, 500);
  }
  update(modal: any) {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide()
        this.branchService.branch_Upadate(this.branchForm.value).subscribe(res => {
          this.services.showSuccess(res.data);
          modal.dismiss('Cross click');
          this.branchFatch();
          this.branchForm.reset({});
          this.submitted = false;
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
      this.branchService.branch_Delete(this.id).subscribe(res => {
        this.services.showSuccess(res.data);
        this.branchFatch();
        modal.dismiss('Cross click');
      }, err => {
        this.services.showWarning(err.error.error.reason);
      })
    }, 500);
  }
  filter(event:any){
    this.branchForm.patchValue({
      degreeTypeId:null
    })
    this.degreeArr = this.degree_Get.filter((x:any)=>{
      return x.degreeType == this.branchForm.value.degreeType;
    })
  }
  filterbyid(event:any){
    this.degreeArr = this.degree_Get.filter((x:any)=>{
      return x.degreeType == event;
    })
  }
}