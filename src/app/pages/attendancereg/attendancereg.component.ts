import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendancereg',
  templateUrl: './attendancereg.component.html',
  styleUrls: ['./attendancereg.component.scss']
})
export class AttendanceregComponent {
  attendanceForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
  ) { }

  ngOnInit() {
    this.attendanceForm = this.formBuilder.group({
      studName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      checkin: ['', [Validators.required]],
      checkout: ['', [Validators.required]],
      status: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      degreeName: ['', [Validators.required]],
      degreeType: ['', [Validators.required]],
    });
  }

  get b() { return this.attendanceForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.attendanceForm.invalid) {
      return;
    }
    else {
      this.router.navigate(['/faculty']);
    }
  }
  home() {
    this.router.navigate(['app/dashboard/facultylist'])
  }
  attendance() {
    this.router.navigate(['app/attendance'])
  }
}