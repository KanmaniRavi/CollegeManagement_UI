import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgToastModule } from 'ng-angular-popup';
import { PagesModule } from './pages/pages.module';
import { MasterModule } from './pages/master/master.module';
import { LayoutsModule } from './layouts/layouts.module';
import { BreadcrumbModule } from 'angular-crumbs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './core/interceptor/jwt/login.interceptor';
import { ErrorInterceptor } from './core/interceptor/error/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    NgToastModule,
    MasterModule,
    BreadcrumbModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }