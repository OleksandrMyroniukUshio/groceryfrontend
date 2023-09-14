import { Component } from '@angular/core';
import { UserDTO } from './UserDTO';
import { UserAuthService } from 'src/app/services/userservices/user-auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private userAuthService: UserAuthService, private router: Router) { }
  errorMessage: string = '';
  login(username: string, password: string): void {
    const user = new UserDTO(username, password);
    
    this.userAuthService.loginUser(user).subscribe({
      next: response => {
        localStorage.setItem('jwt_token', response.token);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error during login:', error);
        
        if (error.status === 400) {
            this.errorMessage = error.error.message || 'Signing in failed. Please try again.';
        } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
    },
      complete: () => {
        console.log('Login request completed');
        this.router.navigate(['/groceries']);
      }
    });
  }
}
