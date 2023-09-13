import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionhistoryService } from 'src/app/core/services/collectionhistory.service';
import { FacultyService } from 'src/app/core/services/faculty.service';
import { FeescollectionService } from 'src/app/core/services/feescollection.service';
import { ServiceService } from 'src/app/core/services/service.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: any;
  dataValue: any = [];
  dataValues: any = [];
  data: any = [];
  degreeType: any = [];
  dept: any = [];
  ug: any = [];
  pg: any = [];
  collection:any=[];
  constructor(private router: Router, private services: ServiceService,
    private studentService: StudentService, private feesHistoryService: FeescollectionService,
    private facultyService: FacultyService, private spinnerService: NgxSpinnerService,
    private feesCollectionHistoryService: CollectionhistoryService) { }
  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.feesHistoryService.history_Weekly().subscribe(res => {
        this.dataValue = res.data;
        // let data = [];
        // for (let dep in this.dataValue) {
        //   for (let branch in this.dataValue[dep]) {
        //     this.dataValue[dep][branch].department = dep;
        //     this.dataValue[dep][branch].branch = branch;
        //     data.push(this.dataValue[dep][branch]);
        //   }
        // };
        // this.collection = data;
      })
      this.feesCollectionHistoryService.historyGet().subscribe(res => {
        this.dataValues = res.data.slice(-7);
      })
      this.studentService.student_GetDept().subscribe(res => {
        this.data = res.data;
        // const ug = this.data.UG;
        // const ugArray: any = [];

        // Object.keys(ug).forEach((key) => {
        //   const courses = ug[key];
        //   const courseArray: any = [];

        //   Object.keys(courses).forEach((courseKey) => {
        //     const course = courses[courseKey];
        //     const courseObj: any = {};

        //     Array.from(course).forEach((item: any) => {
        //       const itemKey = Object.keys(item)[0];
        //       courseObj[itemKey] = item[itemKey];
        //     });

        //     courseArray.push(courseObj);
        //   });

        //   ugArray.push({ [key]: courseArray });
        // });
        // console.log(ugArray);
        // this.ug = ugArray;
        
        // const pg = this.data.PG;
        // const pgArray: any = [];

        // Object.keys(pg).forEach((key) => {
        //   const courses = pg[key];
        //   const courseArray: any = [];

        //   Object.keys(courses).forEach((courseKey) => {
        //     const course = courses[courseKey];
        //     const courseObj: any = {};

        //     Array.from(course).forEach((item: any) => {
        //       const itemKey = Object.keys(item)[0];
        //       courseObj[itemKey] = item[itemKey];
        //     });

        //     courseArray.push(courseObj);
        //   });

        //   pgArray.push({ [key]: courseArray });
        // });

        // console.log(pgArray);
        // this.pg = pgArray;
      })
      this.feesCollectionHistoryService.historyDeptCollection().subscribe(res => {
        this.dept = res.data;
      })
    }, 500);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getValues(obj: any): number[] {
    return Object.values(obj);
  }
  getDegreeTypeRowCount(degreeType: string): number {
    return Object.keys(this.data[degreeType]).length;
  }
  getDepartmentKeys(): string[] {
    return Object.keys(this.data);
  }

  getDegreeKeys(department: string): string[] {
    return Object.keys(this.data[department]);
  }

  getSpecializationKey(department: any): string {
    return Object.keys(department)[0];
  }

  getSpecializationCount(department: any): number {
    return department[Object.keys(department)[0]];
  }

  getRowCount(degreeType: string): number {
    let count = 0;
    const degrees = this.getDegreeKeys(degreeType);
    for (const degree of degrees) {
      count += this.data[degreeType][degree].length;
    }
    return count;
  }
  getUGDegreeKeys(): string[] {
    return Object.keys(this.data.UG);
  }

  getPGDegreeKeys(): string[] {
    return Object.keys(this.data.PG);
  }
  getDegreeKey(department: string): string[] {
    return Object.keys(this.data[department]);
  }
}