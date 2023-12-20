import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Bilinmeyen bir hata oluştu!';
                if (error.error instanceof ErrorEvent) {
                    // İstemci tarafında doğabilecek olan hatalarda bu kısım çalışacaktır.
                    errorMessage = `Hata: ${error.error.message}`;
                } else {
                    // Sunucu tarafında doğabilecek olan hatalarda ise bu kısım çalışacaktır.
                    errorMessage = `Sunucu hatası kodu: ${error.status}\nMesaj: ${error.message}`;
                }
                console.error(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}
