import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject with an initial value of `false` (not authenticated)
  private authStatus = new BehaviorSubject<boolean>(false);

  // Expose the authStatus as an observable
  authStatus$: Observable<boolean> = this.authStatus.asObservable();

  constructor() {}

  // Call this method after a successful login
  loginSuccess() {
    this.authStatus.next(true); // Emit `true` for authenticated
    localStorage.setItem('authenticated', 'true');
  }

  // Call this method on logout
  logout() {
    this.authStatus.next(false); // Emit `false` for not authenticated
    localStorage.setItem('authenticated', 'false');
  }
}
