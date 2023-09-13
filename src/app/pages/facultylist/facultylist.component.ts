import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacultyService } from 'src/app/core/services/faculty.service';

@Component({
  selector: 'app-facultylist',
  templateUrl: './facultylist.component.html',
  styleUrls: ['./facultylist.component.scss']
})
export class FacultylistComponent implements OnInit {
  dataValue: any = [];
  values:any=[];
  constructor(private facultyService: FacultyService, private spinnerService: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.facultyService.faculty_Get().subscribe(res => {
        this.dataValue = res.data;
        this.values = this.dataValue.filter((x:any)=>{
         return x.status == "ACTIVE"         
        })
        console.log(this.values);
      })
    }, 500);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }
}