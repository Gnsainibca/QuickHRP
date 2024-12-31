import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../core.index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public checkAuth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('authenticated') || 'false'
  );

  constructor(private router: Router) {}

  public login(): void {
    this.checkAuth.next('true');
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('timeOut', Date());
    this.router.navigate([routes.appointment]);
  }
  public logout(): void {
    this.router.navigate([routes.login]);
    this.checkAuth.next('false');
    localStorage.clear();
    sessionStorage.clear();
  }
}
