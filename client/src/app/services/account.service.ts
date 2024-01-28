import { Injectable } from '@angular/core';
import { LoginUser } from '../interfaces/LoginUser';
import { HttpClient } from '@angular/common/http';
import { ApiResponseUser } from '../interfaces/ApiResponseUser';
import { BehaviorSubject, map } from 'rxjs';
import { RegisterUser } from '../interfaces/RegisterUser';
import { getLocaleMonthNames } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL: string = 'https://localhost:5001/api/';
  currentUserSource = new BehaviorSubject<ApiResponseUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  localStorageUser = 'user';

  public constructor(private http: HttpClient) {}

  login(model: LoginUser) {
    return this.http
      .post<ApiResponseUser>(this.baseURL + 'account/login', model)
      .pipe(
        map((response: ApiResponseUser) => {
          const user = response;
          if (user) {
            localStorage.setItem(this.localStorageUser, JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  register(model: RegisterUser) {
    return this.http
      .post<ApiResponseUser>(this.baseURL + 'account/register', model)
      .pipe(
        map((response: ApiResponseUser) => {
          const user = response;
          if (user) {
            localStorage.setItem(this.localStorageUser, JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user: ApiResponseUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
