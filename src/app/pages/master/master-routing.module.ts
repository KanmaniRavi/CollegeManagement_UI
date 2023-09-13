import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveGuard } from 'src/app/core/Auth Guard/can-active.guard';
import { BranchComponent } from './branch/branch.component';
import { CountryComponent } from './country/country.component';
import { DegreeComponent } from './degree/degree.component';
import { DistrictComponent } from './district/district.component';
import { FacultydeptComponent } from './facultydept/facultydept.component';
import { FeesmasterComponent } from './feesmaster/feesmaster.component';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  { path: 'country', component: CountryComponent, canActivate: [CanActiveGuard] },
  { path: 'state', component: StateComponent, canActivate: [CanActiveGuard] },
  { path: 'district', component: DistrictComponent, canActivate: [CanActiveGuard] },
  { path: 'degree', component: DegreeComponent, canActivate: [CanActiveGuard] },
  { path: 'branch', component: BranchComponent, canActivate: [CanActiveGuard] },
  { path: 'facultydept', component: FacultydeptComponent, canActivate: [CanActiveGuard] },
  { path: 'feesmaster', component: FeesmasterComponent, canActivate: [CanActiveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
