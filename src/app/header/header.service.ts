import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private reloadNavbarSource = new BehaviorSubject<boolean>(false);
  reloadNavbar$ = this.reloadNavbarSource.asObservable();

  triggerReload() {
    this.reloadNavbarSource.next(true);
  }
}
