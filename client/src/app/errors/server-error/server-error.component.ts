import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerError } from '../../interfaces/ServerError';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
})
export class ServerErrorComponent {
  error?: ServerError;

  public constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

  ngOnInit() {
    console.log(this.error);
  }
}
