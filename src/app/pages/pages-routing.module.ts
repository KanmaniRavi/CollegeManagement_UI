import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuard } from '../core/Auth Guard/can-active.guard';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceregComponent } from './attendancereg/attendancereg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultylistComponent } from './facultylist/facultylist.component';
import { FacultyregComponent } from './facultyreg/facultyreg.component';
import { FeesmanagementComponent } from './feesdeclaration/feesmanagement.component';
import { FeesmanageregComponent } from './feescollection/feesmanagereg.component';
import { FormElementComponent } from './feeshistory/form-element.component';
import { InvoiceComponent } from './feesreceipt/invoice.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudlistComponent } from './studlist/studlist.component';
import { StudregComponent } from './studreg/studreg.component';
import { FeedeclarationlistComponent } from './feedeclarationlist/feedeclarationlist.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'facultylist', component: FacultylistComponent, canActivate: [CanActiveGuard] },
      { path: 'studentlist', component: StudentlistComponent, canActivate: [CanActiveGuard] },
    ]
  },
  { path: 'form', component: FormElementComponent, canActivate: [CanActiveGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [CanActiveGuard] },
  { path: 'profile-setting', component: ProfileSettingComponent, canActivate: [CanActiveGuard] },
  { path: 'receipt', component: InvoiceComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'pages', component: PagesComponent, canActivate: [CanActiveGuard] },
  { path: 'facultyreg', component: FacultyregComponent, canActivate: [CanActiveGuard] },
  { path: 'facultyreg/:id', component: FacultyregComponent, canActivate: [CanActiveGuard] },
  { path: 'studlist', component: StudlistComponent, canActivate: [CanActiveGuard] },
  { path: 'studreg', component: StudregComponent , canActivate: [CanActiveGuard] },
  { path: 'studreg/:id', component: StudregComponent , canActivate: [CanActiveGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [CanActiveGuard] },
  { path: 'attendancereg', component: AttendanceregComponent ,canActivate: [CanActiveGuard] },
  { path: 'feedeclaration', component: FeesmanagementComponent, canActivate: [CanActiveGuard] },
  { path: 'feedeclaration/:id', component: FeesmanagementComponent, canActivate: [CanActiveGuard] },
  { path: 'feescollection', component: FeesmanageregComponent, canActivate: [CanActiveGuard] },
  { path: 'feeshistory', component: FormElementComponent, canActivate: [CanActiveGuard] },
  { path: 'feedeclarationlist', component: FeedeclarationlistComponent, canActivate: [CanActiveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
