import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { NgClass } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavbarComponent, NgClass, SearchBarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee-Management';
  isNavbarMinimized: boolean = false;
  toggleNavbar(isNavbarMinimized: boolean){
    this.isNavbarMinimized = isNavbarMinimized;
  }
}
