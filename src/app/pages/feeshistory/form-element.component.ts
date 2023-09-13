import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionhistoryService } from 'src/app/core/services/collectionhistory.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/core/environments/environment';
import { FeescollectionService } from 'src/app/core/services/feescollection.service';
import { BranchService } from 'src/app/core/services/branch.service';
import { DegreeService } from 'src/app/core/services/degree.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnInit {
  searchForm!: FormGroup;
  submitted = false;
  collectionGet: any = [];
  pdfSrc: any;
  id: any;
  dates: any;
  serachHistory: any;
  degree: any = [];
  degreeType: any;
  branch: any = [];
  private baseUrl = environment.API_URL;
  blob: any;
  constructor(
    private feesCollectionHistoryService: CollectionhistoryService,
    private feesCollectionService: FeescollectionService,
    private spinnerService: NgxSpinnerService,
    private toastr: ServiceService,
    private NgbModal: NgbModal,
    private formBuilder: FormBuilder,
    private degreeService: DegreeService,
    private branchService: BranchService,
  ) { }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      degree: [null, Validators.required],
      branchName: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    })
    this.feeHistory();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.degreeGet();
  }
  get b() {
    return this.searchForm.controls;
  }
  feeHistory() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesCollectionHistoryService.historyGet().subscribe(res => {
        this.collectionGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      }
      )
    }, 500);
  }
  print(modal: any, id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.searchForm.value.degree == null && this.searchForm.value.branchName == null && this.searchForm.value.fromDate == null && this.searchForm.value.toDate == null) {
        const jwtToken = this.toastr.getToken();
        this.pdfSrc = '';
        var pdfSrc1 = 'http://101.53.155.156:8087/api/feesHistory/print/view/' + id;
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
  }
  download(modal: any) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const pdfData: any = reader.result;
      // Create a temporary link element to download the PDF
      const linkElement = document.createElement('a');
      linkElement.href = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
      linkElement.download = "Fees History";
      // Programmatically trigger a click event on the link element
      linkElement.dispatchEvent(new MouseEvent('click'));
    };
    reader.readAsArrayBuffer(this.blob);
    modal.dismiss('Cross click');
  }
  filter() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.searchForm.value.degree == null) {
        this.searchForm.patchValue({
          degree: ''
        })
      }
      if (this.searchForm.value.branchName == null) {
        this.searchForm.patchValue({
          branchName: ''
        })
      }
      if (this.searchForm.value.fromDate == null) {
        this.searchForm.patchValue({
          fromDate: ''
        })
      }
      if (this.searchForm.value.toDate == null) {
        this.searchForm.patchValue({
          toDate: ''
        })
      }
      let seachObj = this.searchForm.value;
      this.feesCollectionService.history_Search(seachObj).subscribe(res => {
        this.collectionGet = res.data;
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
      })
    }, 500)
  }
  pdfDownload(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.searchForm.value.degree == null) {
        this.searchForm.patchValue({
          degree: ''
        })
      }
      if (this.searchForm.value.branchName == null) {
        this.searchForm.patchValue({
          branchName: ''
        })
      }
      if (this.searchForm.value.fromDate == null) {
        this.searchForm.patchValue({
          fromDate: ''
        })
      }
      if (this.searchForm.value.toDate == null) {
        this.searchForm.patchValue({
          toDate: ''
        })
      }
      if (this.searchForm.value.degree == null && this.searchForm.value.branchName == null && this.searchForm.value.fromDate == null && this.searchForm.value.toDate == null) {
        const jwtToken = this.toastr.getToken();
        this.pdfSrc = '';
        var pdfSrc1 = `http://101.53.155.156:8087/api/feesHistory/print/view?degree`;
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
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
      } else {
        var pdfSrc1 = `http://101.53.155.156:8087/api/feesHistory/print/view?degree=${this.searchForm.value.degree}&branchName=${this.searchForm.value.branchName}&fromDate=${this.searchForm.value.fromDate}&toDate=${this.searchForm.value.toDate}`;
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
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
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
      }
    }, 500)
  }
  downloadxl() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (this.searchForm.value.degree == null) {
        this.searchForm.patchValue({
          degree: ''
        })
      }
      if (this.searchForm.value.branchName == null) {
        this.searchForm.patchValue({
          branchName: ''
        })
      }
      if (this.searchForm.value.fromDate == null) {
        this.searchForm.patchValue({
          fromDate: ''
        })
      }
      if (this.searchForm.value.toDate == null) {
        this.searchForm.patchValue({
          toDate: ''
        })
      }
      if (this.searchForm.value.degree == null && this.searchForm.value.branchName == null && this.searchForm.value.fromDate == null && this.searchForm.value.toDate == null) {
        var pdfSrc1 = `http://101.53.155.156:8087/api/feesHistory/print/xl?degree=${this.searchForm.value.degree}&branchName=${this.searchForm.value.branchName}&fromDate=${this.searchForm.value.fromDate}&toDate=${this.searchForm.value.toDate}`;
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            saveAs(blob, "feesHistory.xlsx");
          });
      } else {
        var pdfSrc1 = `http://101.53.155.156:8087/api/feesHistory/print/xl?degree=${this.searchForm.value.degree}&branchName=${this.searchForm.value.branchName}&fromDate=${this.searchForm.value.fromDate}&toDate=${this.searchForm.value.toDate}`
        if (this.searchForm.value.degree == '') {
          this.searchForm.patchValue({
            degree: null
          })
        }
        if (this.searchForm.value.branchName == '') {
          this.searchForm.patchValue({
            branchName: null
          })
        }
        if (this.searchForm.value.fromDate == '') {
          this.searchForm.patchValue({
            fromDate: null
          })
        }
        if (this.searchForm.value.toDate == '') {
          this.searchForm.patchValue({
            toDate: null
          })
        }
        const jwtToken = this.toastr.getToken();
        const requestHeaders = {
          "Authorization": `BslogiKey ${jwtToken}`,
        };
        fetch(pdfSrc1, { headers: requestHeaders })
          .then(response => response.blob())
          .then(blob => {
            this.blob = blob;
            saveAs(blob, "feesHistory.xlsx");
          });
      }
    }, 500)
  }
  degreeGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.searchForm.patchValue({
        branchName: null
      })
      this.degreeService.degree_Get().subscribe(res => {
        this.degree = res.data;

      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
  branchGet(id: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      if (id == null) {
        this.searchForm.patchValue({
          branchName: null,
        })
        this.feeHistory();
      }
      this.branchService.branchGet_degreeId(id.id).subscribe(res => {
        this.branch = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500);
  }
}
