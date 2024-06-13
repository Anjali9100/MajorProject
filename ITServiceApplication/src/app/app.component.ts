import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ITServiceApplication';

  drawerOpened = false;
  activeItem = 1;
  userName:string="Anjali";
  
  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }


  logOut(){

  }


  isProjectSubmenuOpen: boolean = false;
  toggleProjectSubmenu(): void {
    this.isProjectSubmenuOpen = !this.isProjectSubmenuOpen;
  }
}
