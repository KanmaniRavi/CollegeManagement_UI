import { Component, OnInit } from '@angular/core';
import { FeescollectionService } from 'src/app/core/services/feescollection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  id: any;
  dataValue: any = [];
  amount: any;
  blob:any;
  pdfSrc:any;
  userName:any;
  constructor(private feesHistoryService: FeescollectionService,private NgbModal: NgbModal,
    private spinnerService: NgxSpinnerService,private toastr: ServiceService,) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.id = localStorage.getItem('id');
    this.feesHistoryService.history_Edit(this.id).subscribe(res => {
      this.dataValue = res.data[0];
      this.amount = res.data[0].feesHistoryComponent[0].totalPayables;
      for (let i = 0; i < this.dataValue.feesHistoryComponent.length; i++) {
        let Obj = {
          feesName: this.dataValue.feesHead[i].feesHeadName,
          amount: this.dataValue.feesHead[i].amount,
          // id: null,
        };
      }
    })
  }
  pdfDownload(modal:any){
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
        const jwtToken = this.toastr.getToken();
        this.pdfSrc = '';
        var pdfSrc1 = 'http://101.53.155.156:8087/api/feesHistory/print/view/' + this.id;
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
}