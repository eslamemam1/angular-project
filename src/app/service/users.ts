import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  users: string[] = ['Alice', 'Bob', 'Charlie'];
  getUsers() {
    return this.users;
  }

  constructor(private http: HttpClient) {}

  getUsersFromApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
}
