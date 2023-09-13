import { Component } from '@angular/core';
import { UserDTO } from './UserDTO';
import { UserAuthService } from 'src/app/services/userservices/user-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private userAuthService: UserAuthService, private router: Router) { }
  
  login(username: string, password: string): void {
    const user = new UserDTO(username, password);
    
    this.userAuthService.loginUser(user).subscribe({
      next: response => {
        localStorage.setItem('jwt_token', response.token);
      },
      error: error => {
        console.error('Error during login:', error);
      },
      complete: () => {
        console.log('Login request completed');
        this.router.navigate(['/groceries']);
      }
    });
  }
}
