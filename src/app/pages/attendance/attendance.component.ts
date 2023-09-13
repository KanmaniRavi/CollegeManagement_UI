import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  data: any = [];
constructor(private router : Router){}
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
attendancereg(){
  this.router.navigate(['app/attendancereg'])
}
home(){
  this.router.navigate(['app/dashboard/facultylist'])
}
}