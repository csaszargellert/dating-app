import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './services/account.service';
import { ApiResponseUser } from './interfaces/ApiResponseUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  private http: HttpClient = inject(HttpClient);
  private account: AccountService = inject(AccountService);

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.error(error),
      complete: () => console.log('This has completed in APP_COMPONENT'),
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user: ApiResponseUser = JSON.parse(userString);
    this.account.setCurrentUser(user);
  }
}
