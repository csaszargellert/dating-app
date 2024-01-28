import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterUser } from '../interfaces/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  model: RegisterUser = { username: '', password: '' };

  public constructor(private accountService: AccountService) {}

  @Output() cancelRegistrationForm: EventEmitter<void> =
    new EventEmitter<void>();

  onRegister() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.onCancel();
      },
      error: (error) => console.error(error),
    });
  }

  onCancel() {
    this.cancelRegistrationForm.emit();
  }
}
