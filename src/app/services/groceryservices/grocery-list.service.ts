import { Injectable } from '@angular/core';
import { Grocery } from '../../components/grocery-list/Grocery';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private apiURL = "https://myroniukgrocery.online/api";
  
  constructor(private http: HttpClient, private router: Router) { } 

  private getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  get httpOptions() {
    const token = this.getToken();
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    return { headers: headers };
  }
  
  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      localStorage.removeItem('jwt_token');
    }
    console.error('HTTP Error:', error);
    return throwError(() => error);
  }

  getAllGroceries(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>(this.apiURL + '/GroceriesList', this.httpOptions).pipe(
      catchError(this.handleHttpError.bind(this))
    );
  }

  addGrocery(item: Grocery): Observable<Grocery> {
    return this.http.post<Grocery>(this.apiURL + '/GroceriesList', JSON.stringify(item), this.httpOptions).pipe(
      catchError(this.handleHttpError.bind(this))
    );
  }

  updateGrocery(id: number): Observable<Grocery> {
    return this.http.put<Grocery>(this.apiURL + `/GroceriesList`, id, this.httpOptions).pipe(
      catchError(this.handleHttpError.bind(this))
    );
  }

  deleteGrocery(id: number): Observable<Grocery> {
    return this.http.delete<Grocery>(this.apiURL + `/GroceriesList/${id}`, this.httpOptions).pipe(
      catchError(this.handleHttpError.bind(this))
    );
  }

  deleteGroceries(): Observable<Grocery> {
    return this.http.delete<Grocery>(this.apiURL + `/GroceriesList`, this.httpOptions).pipe(
      catchError(this.handleHttpError.bind(this))
    );
  }
}