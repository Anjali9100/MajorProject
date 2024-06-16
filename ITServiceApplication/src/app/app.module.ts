import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolesComponent } from './roles/roles.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectModuleComponent } from './project-module/project-module.component';
import { ProjectMemberComponent } from './project-member/project-member.component';
import { ProjectBranchComponent } from './project-branch/project-branch.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfleComponent } from './profle/profle.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    RolesComponent,
    ProjectDetailsComponent,
    ProjectModuleComponent,
    ProjectMemberComponent,
    ProjectBranchComponent,
    CreateRequestComponent,
    DashboardComponent,
    ProfleComponent,
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
