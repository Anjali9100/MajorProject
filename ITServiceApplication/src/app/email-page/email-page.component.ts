import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthService';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrl: './email-page.component.css'
})
export class EmailPageComponent {
  username:any
  confirmationCode:any
 
  @Input() email:any = history.state.email
 
  constructor(private authService: AuthService, private router:Router) {}
  onSubmit(): void {
      // this.authService.confirmUser(this.email, this.confirmationCode).then(
      //   result => {
      //    this.router.navigate(['login'])
      //   },
      //   err => {
      //   }
      // );
  }
}
