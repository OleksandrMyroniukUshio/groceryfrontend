import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDTO } from 'src/app/components/login-page/UserDTO';

interface RegisterResponse {
  UserId: number;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiURL = "https://myroniukgrocery.online/api/Users";
  
  constructor(private http: HttpClient) { }

  get httpOptions() {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return { headers: headers };
  }

  loginUser(user: UserDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiURL + '/login', JSON.stringify(user), this.httpOptions);
  }

  registerUser(user: UserDTO): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiURL + '/register', JSON.stringify(user), this.httpOptions);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('jwt_token') !== null;
  }

  signOut(): void {
    localStorage.removeItem('jwt_token');
  }
}
