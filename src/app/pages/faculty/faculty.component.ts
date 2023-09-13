import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacultyService } from 'src/app/core/services/faculty.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacultydeptService } from 'src/app/core/services/facultydept.service';
import { environment } from 'src/app/core/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  facultyPdfForm!: FormGroup;
  submitted = false;
  dataValue: any = [];
  id: any;
  serachFaculty: any;
  faclutyDept: any = [];
  dept: any;
  department: any;
  pdfSrc: any;
  private baseUrl = environment.API_URL;
  blob: any;
  constructor(
    private route: Router, private facultyService: FacultyService,
    private toastr: ServiceService, private spinnerService: NgxSpinnerService,
    private NgbModal: NgbModal, private facultyDeptService: FacultydeptService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.facultyPdfForm = this.formBuilder.group({
      departmentId: [null, Validators.required]
    })
    this.facultyPatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.facultyDeptGet();
  }
  get b() { return this.facultyPdfForm.controls; };
  facultyPatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.faculty_Get().subscribe(res => {
        this.dataValue = res.data;
      })
    }, 500);
  }
  onEdit(id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.route.navigate(['app/facultyreg', id]);
    })
  }
  deleteModal(modal: any, id: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.faculty_Delete(this.id).subscribe(res => {
        this.toastr.showSuccess(res.data);
        this.facultyPatch();
        modal.dismiss('Cross click');
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    })
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.facultyPdfForm.reset({});
    this.submitted = false;
  }
  facultyreg() {
    this.route.navigate(['app/facultyreg'])
  }
  home() {
    this.route.navigate(['app/dashboard/facultylist'])
  }
  facultyDeptGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyDeptService.dept_Get().subscribe(res => {
        this.faclutyDept = res.data;
        this.faclutyDept.unshift({
          department: "All",
          id: "null"
        })
        this.department = res.data.department;
      })
    }, 500);
  }
  deptId(event: any) {
    this.dept = event.id;
  }
  download(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.NgbModal.open(modal, { size: 'sm' });
      this.facultyPdfForm.reset({});
      this.submitted = false;
      modal.dismiss('Cross click');
    }, 500)
  }
  downloadPdf(modal: any, close :any) {
    this.submitted = true;
    if (this.facultyPdfForm.invalid) {
      return;
    }
    else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        const jwtToken = this.toastr.getToken();
        this.pdfSrc = '';
        var pdfSrc1 = (this.dept == 'null') ? "http://101.53.155.156:8087/api/faculty/print/view?departmentId" : "http://101.53.155.156:8087/api/faculty/print/view?departmentId=" + this.dept;
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
      }, 500)
    }
    close.dismiss('Cross click');
  }
  pdfDownload(modal: any) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const pdfData: any = reader.result;
      // Create a temporary link element to download the PDF
      const linkElement = document.createElement('a');
      linkElement.href = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
      linkElement.download = "faculty";
      // Programmatically trigger a click event on the link element
      linkElement.dispatchEvent(new MouseEvent('click'));
    };
    reader.readAsArrayBuffer(this.blob);
    modal.dismiss('Cross click');
  }
  downloadxl(modal: any) {
    this.submitted = true;
    if (this.facultyPdfForm.invalid) {
      return;
    } else {
      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
        var pdfSrc1 = (this.dept == 'null') ? this.baseUrl + "api/faculty/print/xl?departmentId" : this.baseUrl + "api/faculty/print/xl?departmentId=" + this.dept;
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            saveAs(blob, "faculty.xlsx");
          });
      }, 500)
    }
    modal.dismiss('Cross click');
  }
}