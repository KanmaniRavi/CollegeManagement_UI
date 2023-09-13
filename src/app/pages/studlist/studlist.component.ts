import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/core/services/service.service';
import { StudentService } from 'src/app/core/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from 'src/app/core/services/branch.service';
import { environment } from 'src/app/core/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DegreeService } from 'src/app/core/services/degree.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-studlist',
  templateUrl: './studlist.component.html',
  styleUrls: ['./studlist.component.scss']
})
export class StudlistComponent implements OnInit {
  pdfForm!: FormGroup;
  downloadForm!: FormGroup;
  dataValue: any = [];
  show: boolean = true;
  searchStudent: any;
  id: any = [];
  branchId: any;
  branch_Get: any = [];
  pdfSrc: any;
  fileName: any;
  submitted = false;
  departmentName: any;
  private bsaeUrl = environment.API_URL;
  degreeArr: any = [];
  degree_Get: any = [];
  blob: any;
  showTable = false;
  degreeNamearr: any = [{ name: 'UG', id: 'UG' }, { name: 'PG', id: 'PG' }, { name: 'OTHERS', id: 'OTHERS' }];
  constructor(private router: Router, private toastr: ServiceService, private NgbModal: NgbModal,
    private studentService: StudentService, private spinnerService: NgxSpinnerService,
    private branchService: BranchService, private formBuilder: FormBuilder,
    private degreeService: DegreeService,
  ) { }
  ngOnInit(): void {
    this.downloadForm = this.formBuilder.group({
      rollNo: [null],
      studentFirstName: [null],
      degreeType: [null, [Validators.required]],
      degree: [null, [Validators.required]],
      branchName: [null, [Validators.required]],
    })
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.degreeGet();
  }
  get p() { return this.pdfForm.controls; }
  get b() { return this.downloadForm.controls; }

  studentPatch() {
    this.show = !this.show;
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.studentService.student_Get().subscribe(res => {
        this.dataValue = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  onEdit(id: any) {
    this.router.navigate(['app/studreg', id]);
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
  }
  deleteModal(modal: any, id: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.studentService.student_Delete(this.id).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.studentPatch();
        modal.dismiss('Cross click')
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    }, 500)
  }
  studreg() {
    this.router.navigate(['app/studreg']);
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  download(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.NgbModal.open(modal, { size: 'sm' });
      this.pdfForm.reset({});
      this.submitted = false;
    }, 500)
  }
  downloadPdf(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.downloadForm.value.rollNo == null && this.downloadForm.value.studentFirstName == null && this.downloadForm.value.degreeType == null && this.downloadForm.value.degree == null && this.downloadForm.value.branchName == null) {
        const jwtToken = this.toastr.getToken();
        this.pdfSrc = '';
        var pdfSrc1 = this.bsaeUrl + "api/student/print/view?branchId";
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            const url = URL.createObjectURL(blob);
            this.pdfSrc = url;
          });
        this.NgbModal.open(modal, { size: 'lg' });
        modal.dismiss('Cross click');
      } else {
        this.pdfSrc = '';
        var pdfSrc1 = `http://101.53.155.156:8087/api/student/print/view?branchId=${this.branchId}`;
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            const url = URL.createObjectURL(blob);
            this.pdfSrc = url;
          });
        this.NgbModal.open(modal, { size: 'lg' });
        modal.dismiss('Cross click');
      }

    }, 500)
    // }
  }
  pdfDownload(modal: any) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const pdfData: any = reader.result;
      // Create a temporary link element to download the PDF
      const linkElement = document.createElement('a');
      linkElement.href = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
      linkElement.download = "student";
      // Programmatically trigger a click event on the link element
      linkElement.dispatchEvent(new MouseEvent('click'));
    };
    reader.readAsArrayBuffer(this.blob);
    modal.dismiss('Cross click');
  }
  downloadXl() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.downloadForm.value.rollNo == null && this.downloadForm.value.studentFirstName == null && this.downloadForm.value.degreeType == null && this.downloadForm.value.degree == null && this.downloadForm.value.branchName == null) {
        this.pdfSrc = '';
        var pdfSrc1 = this.bsaeUrl + "api/student/print/xl?branchId";
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            saveAs(blob, "student.xlsx");
          });
      } else {
        this.pdfSrc = '';
        var pdfSrc1 = this.bsaeUrl + "api/student/print/xl?branchId=" + this.branchId;
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            saveAs(blob, "student.xlsx");
          });
      }
    }, 500)
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
  filter(event: any) {
    this.downloadForm.patchValue({
      degree: null,
      branchName: null
    })
    this.branch_Get = [];
    this.degreeArr = this.degree_Get.filter((x: any) => {
      return x.degreeType == this.downloadForm.value.degreeType;
    })
  }
  branchGetAll(event: any) {
    console.log(event);

    if (this.downloadForm.value.degree == null) {
      this.downloadForm.patchValue({ branchName: null });
    }
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.branchService.branchGet_degreeId(event.id).subscribe(res => {
        this.branch_Get = res.data;
      })
    }, 500);
  }
  branchIdGet(event: any) {
    this.branchId = event.id;
  }
  searchFilter() {
    this.showTable = true;
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.downloadForm.value.rollNo == null) {
        this.downloadForm.patchValue({
          rollNo: ''
        })
      }
      if (this.downloadForm.value.studentFirstName == null) {
        this.downloadForm.patchValue({
          studentFirstName: ''
        })
      }
      if (this.downloadForm.value.degree == null) {
        this.downloadForm.patchValue({
          degree: ''
        })
      }
      if (this.downloadForm.value.degreeType == null) {
        this.downloadForm.patchValue({
          degreeType: ''
        })
      }
      if (this.downloadForm.value.branchName == null) {
        this.downloadForm.patchValue({
          branchName: ''
        })
      }
      // if(this.downloadForm.invalid){
      //  this.dataValue = [];
      // }
      this.studentService.student_Search(this.downloadForm.value).subscribe(res => {
        this.dataValue = res.data;
        if (this.downloadForm.value.rollNo == '') {
          this.downloadForm.patchValue({
            rollNo: null
          })
        }
        if (this.downloadForm.value.studentFirstName == '') {
          this.downloadForm.patchValue({
            studentFirstName: null
          })
        }
        if (this.downloadForm.value.degree == '') {
          this.downloadForm.patchValue({
            degree: null
          })
        }
        if (this.downloadForm.value.degreeType == '') {
          this.downloadForm.patchValue({
            degreeType: null
          })
        }
        if (this.downloadForm.value.branchName == '') {
          this.downloadForm.patchValue({
            branchName: null
          })
        }
      })
    })
  }
  addValidation(type: any) {
    if (type == 'rollNo') {
      this.downloadForm.controls['rollNo'].addValidators(Validators.required);
      this.downloadForm.controls['studentFirstName'].clearValidators();
      this.downloadForm.patchValue({
        studentFirstName: ''
      })
    } else {
      this.downloadForm.controls['studentFirstName'].addValidators(Validators.required);
      this.downloadForm.controls['rollNo'].clearValidators();
      this.downloadForm.patchValue({
        rollNo: ''
      })
    }
    this.downloadForm.controls['rollNo'].updateValueAndValidity();
    this.downloadForm.controls['studentFirstName'].updateValueAndValidity();
  }
}
