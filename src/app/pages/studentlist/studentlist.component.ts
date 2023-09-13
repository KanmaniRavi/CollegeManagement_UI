import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {
  dataValue: any = [];
  constructor(private studentService: StudentService, private spinnerService: NgxSpinnerService) { }
  ngOnInit(): void {
    this.studentPatch();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  studentPatch() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide()
      this.studentService.student_Get().subscribe(res => {
        this.dataValue = res.data;
      })
    }, 500);
  }
}