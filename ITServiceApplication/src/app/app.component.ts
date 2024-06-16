import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ITServiceApplication';
  isUserLoggedIn: boolean = false;
  drawerOpened = false;
  activeItem = 1;
  userName: string = 'Anjali';
  isProjectSubmenuOpen: boolean = false;

  formFields = {
    signUp: {
      name: { order: 1 },
      phone_number: { order: 2 },
      email: { order: 2 },
      password: { order: 5 },
      confirm_password: { order: 6 },
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.authService.getCurrentSession().then((user) => {
      if (user) {
        this.isUserLoggedIn = true;
        console.log(this.router.url);
        // Check if already on the dashboard to avoid unnecessary navigation
        if (this.router.url !== 'dashboard') {
          this.router.navigate(['/dashboard']); // Navigate without reload
        }
      } else {
        this.isUserLoggedIn = false;
        if (this.router.url !== '/login') {
          this.router.navigate(['/login']); // Navigate to login if not logged in
        }
      }
    });
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  logOut() {
    this.authService.signOut();
    window.location.reload();
  }

  toggleProjectSubmenu(): void {
    this.isProjectSubmenuOpen = !this.isProjectSubmenuOpen;
  }
}
