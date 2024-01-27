import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  private http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.error(error),
      complete: () => console.log('This has completed in APP_COMPONENT'),
    });
  }
}
