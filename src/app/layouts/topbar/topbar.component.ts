import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  userName: any;
  userDetail: any;
  user: any = [];
  userId:any;
  users:any;
  constructor(private router: Router,
    private spinnerService: NgxSpinnerService,
    private services: ServiceService) { }
  ngOnInit(): void {
    this.services.user_Details().subscribe(res => {
      this.userName = res.userDetails.fullName;
      this.userDetail = res.userDetails.roleName;
      this.user = res.userDetails;
      this.userId= res.userDetails.referenceId;
      this.users= res.userDetails.userName;
      localStorage.setItem('users', JSON.stringify(this.user));
      localStorage.setItem('user', this.userDetail);
      localStorage.setItem('userid', this.userId);
      localStorage.setItem('userName', this.users);
    })
  }
  dashboard() {
    setTimeout(() => {
      this.router.navigate(['/app/dashboard/facultylist']);
    }, 500);
  }
  logout() {
    this.spinnerService.show();
    localStorage.clear();
    this.router.navigate(['/login'])
    this.spinnerService.hide();
  }
}