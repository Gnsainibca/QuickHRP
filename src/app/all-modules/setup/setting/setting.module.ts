import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { DashbaordSettingComponent } from './dashboard/dashboard-setting.component';
import { SettingService } from './shared/services/setting.service';
import { SettingRoutingModule } from './setting-routing.module';
import { SetupGeneralSettingComponent } from './general/setup-general-setting.component';
import { SetupPrefixSettingComponent } from './prefix/setup-prefix-setting.component';
import { SetupGenderFormComponent } from './gender/form/setup-gender-form.component';
import { SetupGenderListComponent } from './gender/list/setup-gender-list.component';
import { SetupBloodGroupFormComponent } from './blood-group/form/setup-blood-group-form.component';
import { SetupBloodGroupListComponent } from './blood-group/list/setup-blood-group-list.component';
import { SetupMaritalStatusFormComponent } from './marital-status/form/setup-marital-status-form.component';
import { SetupMaritalStatusListComponent } from './marital-status/list/setup-marital-status-list.component';

@NgModule({
  declarations: [
    SetupGeneralSettingComponent,
    SetupPrefixSettingComponent,
    DashbaordSettingComponent,
    SetupGenderFormComponent,
    SetupGenderListComponent,
    SetupBloodGroupFormComponent,
    SetupBloodGroupListComponent,
    SetupMaritalStatusFormComponent,
    SetupMaritalStatusListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingRoutingModule,
    AgGridModule,
  ],
  providers: [
    SettingService,
  ]
})
export class SettingModule { }
