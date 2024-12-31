import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService,routes } from '../shared/core.index';
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { menu, routerlink, sideBar } from '../shared/models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  {
  public routes = routes;

  side_bar_data: Array<sideBar> = [];

  base = '';
  page = '';
  actualBase = '';
  currentUrl = '';

  constructor(private data: DataService, public router: Router, private sideBar: SideBarService) {
    this.side_bar_data = this.data.sideBar;
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
  }

  private getRoutes(route: routerlink): void {
    this.currentUrl = route.url;    
    const splitVal = route.url.split('/');
    
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.actualBase = `/${this.base}`
  }

  public expandSubMenus(menu: menu): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: sideBar) => {
      mainMenus.menu.map((resMenu: menu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute == false) {
            sessionStorage.removeItem('menuValue');
          }
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
}
