import { Component } from '@angular/core';
import { UserDTO } from '../login-page/UserDTO';
import { UserAuthService } from 'src/app/services/userservices/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private userAuthService: UserAuthService, private router: Router) { }
  
  passwordMismatch: boolean = false;
  register(username: string, password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }
    
    const user = new UserDTO(username, password);
    this.userAuthService.registerUser(user).subscribe({
      next: response => {
        console.log('Registration successful', response);
      },
      error: error => {
        console.error('Error during registration:', error);
      },
      complete: () => {
        console.log('Registration request completed');
        this.router.navigate(['/login']);
      }
    });
  }
}
