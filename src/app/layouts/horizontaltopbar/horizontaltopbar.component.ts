import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-horizontaltopbar',
  templateUrl: './horizontaltopbar.component.html',
  styleUrls: ['./horizontaltopbar.component.scss'],
})
export class HorizontaltopbarComponent implements OnInit {
  public user: any;
  public userDetails:any;
  showId:boolean = false;
  constructor(public getDetails: ServiceService,private NgbModal: NgbModal,) { }
  ngOnInit(): void {
    this.NgbModal.dismissAll();
  }
  onMenuClick(event: any) {
    const nextEl = event.target.nextElementSibling;
    console.log(nextEl)
    if (nextEl) {
      event.target.classList.toggle('active');
      nextEl.classList.toggle('d-block');
    }
    return false;
  }
}
