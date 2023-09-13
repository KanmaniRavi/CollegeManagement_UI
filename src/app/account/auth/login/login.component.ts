import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/core/services/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  submitted = false;
  Password = false;
  error = '';
  res: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private Service: ServiceService, private spinner: NgxSpinnerService,
    private NgbModal: NgbModal
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.forgotForm = this.formBuilder.group({
      userNameOrEmail: [null, Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }
  get b() { return this.forgotForm.controls; }

  toggle(){
    this.Password = !this.Password;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      this.Service.login(this.loginForm.value).subscribe(res => {
        this.res = res.data.jwt;
        localStorage.setItem('token', this.res);
        this.Service.showSuccess(res.data.message);
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        setTimeout(() => {
          this.router.navigate(['/app/dashboard/facultylist']);
        }, 1000);
      }, (err) => {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.Service.showError(err.error.error.message);
      })
    }
  }
  openModal(modal: any) {
    this.NgbModal.open(modal, { size: 'sm' });
    this.forgotForm.reset({});
    this.submitted = false;
  }
  forgotPassword(modal: any) {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    else{
      this.spinner.show();
      setTimeout(()=>{
        this.spinner.hide();
        this.Service.psw_Forgot(this.forgotForm.value).subscribe(res=>{
          this.Service.showSuccess(res.data);
        }, err=>{
          this.Service.showError(err.error.error.reason);
        })
      },500)
      modal.dismiss('cancel click');
    }
  }
}