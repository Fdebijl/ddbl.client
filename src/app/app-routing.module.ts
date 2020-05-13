import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_services';
import { LoginComponent, UploadComponent, ProfileComponent, RegisterComponent, MainDashboardComponent, VisComponent } from './_components';
import {TermsComponent} from './_components/terms/terms.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '',   component: MainDashboardComponent },
    { path: 'home',   redirectTo: '/', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'visualization', component: VisComponent },
    { path: 'terms-of-service', component: TermsComponent },
    // ========= BEGIN PROTECTED COMPONENTS ==========
    // The following components should all use 'canActivate: [AuthGuard]' in order to prevent unauthorized access.
    // Obviously, this can be worked around by an attacker so all API endpoints should still validate that the user is authorized to view a resource.
    { path: 'user/me', component: ProfileComponent, canActivate: [AuthGuard], data: { showSelf: true } },
    { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }
    // ========== END PROTECTED COMPONENTS ===========
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
