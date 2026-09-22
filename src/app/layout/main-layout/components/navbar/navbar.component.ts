import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserInfo } from '../../../../core/models/user-data.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showMobileMenu: boolean = false;
  showUserMenu: boolean = false;
  userData: UserInfo = {};
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.getUserImg()
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  getUserImg() {
    const userdata = JSON.parse(localStorage.getItem('userData')!)
    if (userdata) {
      this.userData = userdata
    }

  }
  logout(): void {
    this.authService.signOut();
  }
}
