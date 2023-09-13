import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName : any;
  constructor(private service : ServiceService){}
  ngOnInit(): void {
    this.service.user_Details().subscribe(res=>{
      this.userName = res.data.loginObj.fullName;
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
