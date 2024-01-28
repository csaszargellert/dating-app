import { Component } from '@angular/core';
import { LoginUser } from '../interfaces/LoginUser';
import { AccountService } from '../services/account.service';
import { ApiResponseUser } from '../interfaces/ApiResponseUser';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  model: LoginUser = {
    username: null,
    password: null,
  };

  public constructor(
    protected accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin(): void {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.model = {
          username: null,
          password: null,
        };
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Invalid credentials');
      },
    });
  }

  onLogout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
