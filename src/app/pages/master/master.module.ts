import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';
import { DegreeComponent } from './degree/degree.component';
import { BranchComponent } from './branch/branch.component';
import { FacultydeptComponent } from './facultydept/facultydept.component';
import { FeesmasterComponent } from './feesmaster/feesmaster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterPipe } from 'src/app/core/master.pipe';
import { MastercapitalizePipe } from 'src/app/core/pipe/mastercapitalize.pipe';
@NgModule({
  declarations: [
    CountryComponent,
    StateComponent,
    DistrictComponent,
    DegreeComponent,
    BranchComponent,
    FacultydeptComponent,
    FeesmasterComponent,
    MasterPipe,
    MastercapitalizePipe,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class MasterModule {
}
