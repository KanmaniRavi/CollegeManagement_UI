import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeesmanageService } from 'src/app/core/services/feesdeclaration.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedeclarationlist',
  templateUrl: './feedeclarationlist.component.html',
  styleUrls: ['./feedeclarationlist.component.scss']
})
export class FeedeclarationlistComponent implements OnInit {
  feesGet: any = [];
  id: any;
  feeDeclarationSearch:any;
  constructor(private router: Router,
    private toastr: ServiceService,
    private spinnerService: NgxSpinnerService,
    private NgbModal: NgbModal,
    private feeDeclarationService: FeesmanageService) { }
  ngOnInit(): void {
    this.feesDeclarationGet();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  feesDeclarationGet() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feeDeclarationService.feesDeclaration_Get().subscribe(res => {
        this.feesGet = res.data;
      }, err => {
        this.toastr.showError(err.error.error.reason);
      })
    }, 500)
  }
  onEdit(id: any) {
    this.router.navigate(['app/feedeclaration', id]);
  }
  deleteModal(modal: any, id: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.id = id;
  }
  onDelete(modal: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feeDeclarationService.feesDeclaration_Delete(this.id).subscribe(res => {
        this.feesDeclarationGet();
        modal.dismiss('Cross click');
        this.toastr.showSuccess(res.data);
      }, err => {
        this.toastr.showWarning(err.error.error.reason);
      })
    }, 500)
  }
  openModal(openModal: any) {
    this.NgbModal.open(openModal, { size: 'sm' });
  }
  declarationreg(){
    this.router.navigate(['app/feedeclaration']);
  }
}