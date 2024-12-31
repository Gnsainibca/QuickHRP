import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ThemeSettingComponent } from './theme-setting/theme-setting.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AllModulesComponent,
    HeaderComponent,
    SidebarComponent,
    ThemeSettingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [CommonModule, AllModulesRoutingModule, SharedModule],
})
export class AllModulesModule {}
