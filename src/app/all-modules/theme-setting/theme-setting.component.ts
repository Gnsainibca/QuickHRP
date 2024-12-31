import { Component } from '@angular/core';
import { ThemeService } from 'src/app/shared/core.index';

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.scss'],
})
export class ThemeSettingComponent {
  constructor(private theme: ThemeService) {}

  public changePrimaryTheme(val: string): void {
    this.theme.changePrimarySkin(val);
  }
  public changeHeaderTheme(val: string): void {
    this.theme.changeHeaderStyle(val);
  }
  public changeSidebarTheme(val: string): void {
    this.theme.changeSidebarStyle(val);
  }
  public changeFontTheme(val: string): void {
    this.theme.changeFontStyle(val);
  }
}
