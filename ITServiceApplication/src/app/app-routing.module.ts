import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectBranchComponent } from './project-branch/project-branch.component';
import { ProjectMemberComponent } from './project-member/project-member.component';
import { ProjectModuleComponent } from './project-module/project-module.component';
import { RolesComponent } from './roles/roles.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ProfleComponent } from './profle/profle.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { EmailPageComponent } from './email-page/email-page.component';
import { StartPageComponent } from './start-page/start-page.component';

// import { SignInComponent } from '@aws-amplify/ui-angular';
// import { SignUpComponent } from '@aws-amplify/ui-angular';

const routes: Routes = [
  {path:"employee", component:EmployeeComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"project-details", component:ProjectDetailsComponent},
  {path: "project-branch", component:ProjectBranchComponent},
  {path: "project-member", component:ProjectMemberComponent},
  {path: "project-module", component:ProjectModuleComponent},
  {path: "roles", component:RolesComponent},
  {path: "create-request", component:CreateRequestComponent},
  {path:"Profile",component:ProfleComponent},
  {path:"signup", component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"", component:LoginComponent},
  // {path:"",component:UserSignUpComponent},
  {path:"userLogin",component:UserLoginComponent},
  {path:"emailPage", component:EmailPageComponent}
  // {path:"start",component:StartPageComponent},
  // {path:"",component:StartPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
}
