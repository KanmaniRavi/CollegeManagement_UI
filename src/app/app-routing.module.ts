import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyoutsComponent } from './layouts/loyouts/loyouts.component';
import { LoginComponent } from './account/auth/login/login.component';
const routes: Routes = [
  { path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'app', component: LoyoutsComponent, loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule) },
  { path: 'app', component: LoyoutsComponent, loadChildren: () => import('../app/pages/master/master.module').then(m => m.MasterModule) },

  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'',component:LoginComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }