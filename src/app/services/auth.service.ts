import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedin: boolean;
  tokenData: any;
  constructor(private http: HttpClient) {
    this.isLoggedin = false;
  }

  isAuth(): boolean {
    return this.isLoggedin;
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data: any) => {
          this.tokenData = data;
          this.isLoggedin = true;
        })
      );
  }
}
