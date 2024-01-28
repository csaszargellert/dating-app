import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
})
export class ErrorsComponent {
  baseUrl = 'https://localhost:5001/api';

  public constructor(private http: HttpClient) {}

  get400Error() {
    this.http
      .get(this.baseUrl + '/buggy/bad-request')
      .subscribe({ error: (error) => console.error(error) });
  }

  get404Error() {
    this.http
      .get(this.baseUrl + '/buggy/not-found')
      .subscribe({ error: (error) => console.error(error) });
  }

  get401Error() {
    this.http
      .get(this.baseUrl + '/buggy/auth')
      .subscribe({ error: (error) => console.error(error) });
  }

  get500Error() {
    this.http
      .get(this.baseUrl + '/buggy/server-error')
      .subscribe({ error: (error) => console.error(error) });
  }

  get400ValidationError() {
    this.http
      .post(this.baseUrl + '/account/register', {})
      .subscribe({ error: (error) => console.error(error) });
  }
}
