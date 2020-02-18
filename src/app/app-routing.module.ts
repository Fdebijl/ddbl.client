import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_services';
import { LoginComponent, RegisterComponent, HomeComponent } from './_components';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    // ========= BEGIN PROTECTED COMPONENTS ==========
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    // ========== END PROTECTED COMPONENTS ===========
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
