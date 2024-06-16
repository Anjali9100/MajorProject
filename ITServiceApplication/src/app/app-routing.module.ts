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

const routes: Routes = [
  {path:"employee", component:EmployeeComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"project-details", component:ProjectDetailsComponent},
  {path: "project-branch", component:ProjectBranchComponent},
  {path: "project-member", component:ProjectMemberComponent},
  {path: "project-module", component:ProjectModuleComponent},
  {path: "roles", component:RolesComponent},
  {path: "create-request", component:CreateRequestComponent},
  {path:"Profile",component:ProfleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
