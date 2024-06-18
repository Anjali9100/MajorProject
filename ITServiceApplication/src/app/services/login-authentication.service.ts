import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {

  userPool: any;
  cognitoUser: any;
  username: string = "";
 
  UserName:any
  constructor(private router: Router) {
    this.userPool = new CognitoUserPool( {
      UserPoolId: "eu-north-1_7IZ4qSsVo",
      ClientId: "1ii3n9obhbvugc40ohg9vmaidm",
    });
   }
 
 
  // Login
  login(emailaddress: any, password: any) {
    let authenticationDetails = new AuthenticationDetails({
      Username: emailaddress,
      Password: password,
    });
 
    let poolData = {
      UserPoolId: "eu-north-1_7IZ4qSsVo",
      ClientId: "1ii3n9obhbvugc40ohg9vmaidm",
    };
 
    this.username = emailaddress;
    this.userPool = new CognitoUserPool(poolData);
    let userData = { Username: emailaddress, Pool: this.userPool };
    this.cognitoUser = new CognitoUser(userData);
 
    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        this.router.navigate(['home']);
        console.log("Success Results : ", result.idToken.payload.name,result.idToken.payload.email);
      },
      // First time login attempt
      newPasswordRequired: () => {
        this.router.navigate([""]);
      },
      onFailure: (error: any) => {
        console.log("error", error);
      },
 
    });
  }
 
 
  changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    if (newPassword === confirmPassword) {
      this.cognitoUser.completeNewPasswordChallenge(
        this.username,
        newPassword,
        {},
        {
          onSuccess: () => {
            console.log("Reset Success");
            this.router.navigate(["/login"]);
          },
          onFailure: () => {
            console.log("Reset Fail");
          },
        }
      );
    } else {
      console.log("Password didn't Match");
    }
  }
 
  logOut() {
    let poolData = {
      UserPoolId: "eu-north-1_7IZ4qSsVo",
      ClientId: "1ii3n9obhbvugc40ohg9vmaidm",
    };
    this.userPool = new CognitoUserPool(poolData);
    this.cognitoUser = this.userPool.getCurrentUser();
    if (this.cognitoUser) {
      this.cognitoUser.signOut();
      this.router.navigate(['login']);
    }
  }
 
 
  signUp(username: string, password: string, email: string): Promise<any> {
 
    this.UserName = username
    console.log(password, username)
   
      

 
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, null,null ,(err:any, result:any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      });
    });
  }
 
 
  confirmUser(username: string, confirmationCode: string): Promise<any> {
    const userData = {
      Username: username,
      Pool: this.userPool
    };
 
    const cognitoUser = new CognitoUser(userData);
 
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
 
}









