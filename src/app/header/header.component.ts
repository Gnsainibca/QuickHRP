import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/core.index'
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { BaseService } from '../shared/data/base.service';
import { APP_CONSTANT } from '../shared/constants/app-constant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public miniSidebar = false;
  public routes = routes;
  lsKey: string = APP_CONSTANT.localStorage.key.master_generalSettings;
  id: number = 1;
  logo : string = '';
  smallLogo : string = '';
  
  constructor(public router: Router, private sideBar: SideBarService, baseService : BaseService) {
    let generalSetting = baseService.get(this.id, this.lsKey);
    this.logo = generalSetting?.hospitalLogo;
    this.smallLogo = generalSetting?.hospitalSmallLogo;
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  
}
