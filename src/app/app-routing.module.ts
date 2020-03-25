import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_services';
import { LoginComponent } from './_components/user/login/login.component';
import {MainDashboardComponent} from './_components/main-dashboard/main-dashboard.component';
import {VisComponentComponent} from './_components/vis-component/vis-component.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent },
    { path: 'visualization', component: VisComponentComponent },
    // { path: 'register', component: RegisterComponent },
    { path: '',   component: MainDashboardComponent },
    // // ========= BEGIN PROTECTED COMPONENTS ==========
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    // ========== END PROTECTED COMPONENTS ===========
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
