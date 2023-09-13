import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeescollectionService } from 'src/app/core/services/feescollection.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CollectionhistoryService } from 'src/app/core/services/collectionhistory.service';

@Component({
  selector: 'app-feesmanagereg',
  templateUrl: './feesmanagereg.component.html',
  styleUrls: ['./feesmanagereg.component.scss']
})
export class FeesmanageregComponent implements OnInit {
  feeForm!: FormGroup;
  submitted = false;
  fees: any = [];
  keyword: any = 'rollNo';
  feesArr: any = [];
  studentDetails: any;
  id: any;
  pdfSrc: any;
  modalRef: any;
  feesHistoryArr: any = {};
  feeArr: any = [];
  collectionGet: any = [];
  rollNo: any;
  constructor(private formBuilder: FormBuilder,
    private feesCollectionService: FeescollectionService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastr: ServiceService,
    private NgbModal: NgbModal,
    private feesCollectionHistoryService: CollectionhistoryService,
  ) { }
  ngOnInit(): void {
    this.feeForm = this.formBuilder.group({
      id: [null],
      rollNo: [null, [Validators.required]]
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.feesArr = [];
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesCollectionHistoryService.historyGet().subscribe(res => {
        this.collectionGet = res.data;
        this.rollNo = res.data[0].rollNo;
        console.log(this.rollNo);
      })
    }, 500)
  }
  get b() { return this.feeForm.controls; }
  feesGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesCollectionService.collection_Get().subscribe(res => {
        this.fees = res.data[0];
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    })
  }
  onChangeSearch(event: any) {
    if (event.length >= 3) {
      this.feesCollectionService.collection_Serach(event).subscribe(res => {
        this.feesArr = [res.data[0]];
      });
    };
    if (event == undefined) {
      this.feesArr = [];
      this.studentDetails = null;
    }
  };
  selectEvent(event: any) {
    if (event) {
      this.studentDetails = event;
      console.log(this.studentDetails);
      this.feesHistoryArr.receiptNo = null;
      this.feesHistoryArr.id = null;
      this.feesHistoryArr.feesDeclarationId = this.studentDetails.feesDeclarationId;
      this.feesHistoryArr.studentId = this.studentDetails.studentId;
      this.feesHistoryArr.receiptDate = null;
      for (let i = 0; i < this.studentDetails.feesHead.length; i++) {
        let Obj = {
          feesName: this.studentDetails.feesHead[i].feesHeadName,
          amount: this.studentDetails.feesHead[i].amount,
          status : "ACTIVE"
        };
        this.feeArr.push(Obj);
      }
      this.feesHistoryArr.feesHistoryView = this.feeArr;
      this.feesHistoryArr.status = "ACTIVE";
    }
    else {
      this.studentDetails = null;
      this.feesArr = [];
      console.log(event);
    }
  };
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
    this.submitted = false;
    this.feeForm.reset({});
  }
  confirmOpen(modal: any, id: any) {
    this.modalRef = this.NgbModal.open(modal, { size: 'sm' });
    this.id = id.feesHead[0].feesDeclarationId;
  }
  confirmPay(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesCollectionService.history_Create(this.feesHistoryArr).subscribe(res => {
        console.log(res.data.id);
        const id = res.data.id;
        localStorage.setItem('id',id);
        this.toastr.showSuccess(res.data.message);
        this.router.navigate(['app/receipt']);
      }, err => {
        this.toastr.showError(err.error.error.reason);
      });
    }, 500);
    modal.dismiss('Cross click');
  }
  receipt() {
    this.router.navigate(['app/receipt']);
  }
  inputCleared(event: any) {
    this.feesArr = [];
    this.studentDetails = null;
  }
  onInput(event: any) {
    this.feesArr = [];
    this.studentDetails = null;
  }
}