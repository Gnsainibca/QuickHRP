import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private primarySkin: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('primarySkin') || '0'
  );

  private headerStyle: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('headerStyle') || '0'
  );

  private sidebarStyle: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarStyle') || '0'
  );
  
  private FontStyle: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarStyle') || '0'
  );

  public changePrimarySkin(theme: string): void {
    this.primarySkin.next(theme);
    localStorage.setItem('primarySkin', theme);
  }
  public getCurrentPrimarySkin(): Observable<string> {
    return this.primarySkin.asObservable();
  }

  public changeHeaderStyle(theme: string): void {
    this.headerStyle.next(theme);
    localStorage.setItem('headerStyle', theme);
  }
  public getCurrentHeaderStyle(): Observable<string> {
    return this.headerStyle.asObservable();
  }

  public changeSidebarStyle(theme: string): void {
    this.sidebarStyle.next(theme);
    localStorage.setItem('sidebarStyle', theme);
  }
  public getCurrentSidebarStyle(): Observable<string> {
    return this.sidebarStyle.asObservable();
  }

  public changeFontStyle(theme: string): void {
    this.FontStyle.next(theme);
    localStorage.setItem('FontStyle', theme);
  }
  public getCurrentFontStyle(): Observable<string> {
    return this.FontStyle.asObservable();
  }
}
