import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormElementComponent } from './feeshistory/form-element.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { InvoiceComponent } from './feesreceipt/invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyregComponent } from './facultyreg/facultyreg.component';
import { StudlistComponent } from './studlist/studlist.component';
import { StudregComponent } from './studreg/studreg.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceregComponent } from './attendancereg/attendancereg.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { FacultylistComponent } from './facultylist/facultylist.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeesmanagementComponent } from './feesdeclaration/feesmanagement.component';
import { FeesmanageregComponent } from './feescollection/feesmanagereg.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FeedeclarationlistComponent } from './feedeclarationlist/feedeclarationlist.component';
import { SearchPipe } from '../core/search.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CapitalizePipe } from '../core/pipe/capitalize.pipe';
@NgModule({
  declarations: [
    DashboardComponent,
    FormElementComponent,
    PagesComponent,
    ProfileComponent,
    ProfileSettingComponent,
    InvoiceComponent,
    FacultyComponent,
    FacultyregComponent,
    StudlistComponent,
    StudregComponent,
    AttendanceComponent,
    AttendanceregComponent,
    StudentlistComponent,
    FacultylistComponent,
    FeesmanagementComponent,
    FeesmanageregComponent,
    FeedeclarationlistComponent,
    SearchPipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    PdfViewerModule
  ]
})
export class PagesModule { }
