import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

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
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_sngTTrE6A',
      userPoolClientId: '22pkilncepm0m8lli1tl2k7qg0',
    },
  },
});
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
    HttpClientModule,
    AmplifyAuthenticatorModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
