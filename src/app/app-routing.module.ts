import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_services';
import { LoginComponent, UploadComponent, ProfileComponent, RegisterComponent } from './_components';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
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
