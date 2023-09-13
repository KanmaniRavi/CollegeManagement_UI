import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  forgotForm!: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private spinner: NgxSpinnerService, private Service: ServiceService) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      userNameOrEmail: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    } else {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.Service.psw_Forgot(this.forgotForm.value).subscribe(res => {
          this.Service.showSuccess(res.data);
        }, err => {
          this.Service.showError(err.error.error.reason);
        })
      }, 100)
      setTimeout(()=>{
        this.router.navigate(['login']);
      },300)
    }
  }
}

