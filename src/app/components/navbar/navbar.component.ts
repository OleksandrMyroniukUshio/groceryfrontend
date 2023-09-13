import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/userservices/user-auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userAuthService: UserAuthService) { }
  get isLoggedIn(): boolean {
    return this.userAuthService.isLoggedIn();
  }

  signOut(): void {
    this.userAuthService.signOut();
    window.location.reload();
  }
}
