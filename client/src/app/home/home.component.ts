import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registrationMode = false;

  onToggleRegistrationMode() {
    this.registrationMode = !this.registrationMode;
    console.log(this.registrationMode);
  }
}
