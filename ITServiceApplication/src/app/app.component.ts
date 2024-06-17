import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RolesService } from './services/roles.service';

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
  isProjectSubmenuOpen: boolean = false;
  currentUrl:any;
  userRolesID:any;
  firstName: string | null = null;
  lastName: string | null = null;
  roleRecord:any;

  formFields = {
    signUp: {
      name: { order: 1 },
      phone_number: { order: 2 },
      email: { order: 2 },
      password: { order: 5 },
      confirm_password: { order: 6 },
    },
  };

  constructor(private authService: AuthService, private router: Router, 
    private activatedRoute: ActivatedRoute, private roleService:RolesService) {}

  async ngOnInit(): Promise<void> {
    // this.authService.getCurrentSession().then((user) => {
    //   if (user) {
    //     this.isUserLoggedIn = true;
    //     console.log(this.router.url);
    //     if (this.router.url !== 'dashboard') {
    //       this.router.navigate(['/dashboard']); 
    //     }
    //   } else {
    //     this.isUserLoggedIn = false;
    //     if (this.router.url !== '/login') {
    //       this.router.navigate(['/login']); 
    //     }
    //   }
    // });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }

      if (typeof window !== 'undefined') {
        this.userRolesID = sessionStorage.getItem('RoleId');
        this.firstName = sessionStorage.getItem('FirstName');
        this.lastName = sessionStorage.getItem('LastName');
      }
      this.getRoleRecord();
    });
    
  }



  getRoleRecord(){
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roleRecord = roles.map(role => ({
          roleId: role.roleId,
          roleName: role.roleName.toLowerCase()
        }));
      },
      error: (error) => console.error('Error fetching roles:', error)
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
