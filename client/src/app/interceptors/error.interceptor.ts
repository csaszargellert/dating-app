import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const apiValidationErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  apiValidationErrors.push(error.error.errors[key]);
                }
              }
              throw apiValidationErrors.flat();
            } else {
              toastr.error(error.error, error.status.toString());
            }
            break;
          case 401:
            toastr.error('Unauthorised', error.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const extras: NavigationBehaviorOptions = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', extras);
            break;
          default:
            toastr.error('Something unexpected happened');
            break;
        }
      }
      throw error;
    })
  );
};
