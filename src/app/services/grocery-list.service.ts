import { Injectable } from '@angular/core';
import { Grocery } from '../components/grocery-list/Grocery';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private apiURL = "http://104.248.133.191/api";
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  
  constructor(private http: HttpClient) { }

  getAllGroceries() : Observable<Grocery[]> {
    return this.http.get<Grocery[]>(this.apiURL + '/GroceriesList').pipe(
      catchError(error => {
        console.error('Error fetching groceries:', error);
        return throwError(() => error);
      })
    );
  }
  addGrocery(item: Grocery) : Observable<Grocery> {
    return this.http.post<Grocery>(this.apiURL + '/GroceriesList', JSON.stringify(item), this.httpOptions);
  }
  updateGrocery(id: number) : Observable<Grocery> {
    return this.http.put<Grocery>(this.apiURL + `/GroceriesList`, id, this.httpOptions);
  }
  deleteGrocery(id: number): Observable<Grocery> {
    return this.http.delete<Grocery>(this.apiURL + `/GroceriesList/${id}`);
  }
  deleteGroceries(): Observable<Grocery> {
    return this.http.delete<Grocery>(this.apiURL + `/GroceriesList`, this.httpOptions);
  }
}
