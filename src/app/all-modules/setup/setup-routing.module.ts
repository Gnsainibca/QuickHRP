import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./setting/setting.module').then(
            (m) => m.SettingModule
          ),
      },
      {
        path: 'charges',
        loadChildren: () =>
          import('./hospital-charge/hospital-charge-setup.module').then(
            (m) => m.HospitalChargeSetupModule
          ),
      },
      {
        path: 'bed',
        loadChildren: () =>
          import('./bed/bed-setup.module').then(
            (m) => m.BedSetupModule
          ),
      },
      {
        path: 'front-office',
        loadChildren: () =>
          import('./front-office/front-office-setup.module').then(
            (m) => m.FrontOfficeSetupModule
          ),
      },
      {
        path: 'operation',
        loadChildren: () =>
          import('./operation/operation-setup.module').then(
            (m) => m.OperationSetupModule
          ),
      },
      {
        path: 'pharmacy-setting',
        loadChildren: () =>
          import('./pharmacy/pharmacy-setup.module').then(
            (m) => m.PharmacySetupModule
          ),
      },
      {
        path: 'pathology-setting',
        loadChildren: () =>
          import('./pathology/pathology-setup.module').then(
            (m) => m.PathologySetupModule
          ),
      },
      {
        path: 'radiology-setting',
        loadChildren: () =>
          import('./radiology/radiology-setup.module').then(
            (m) => m.RadiologySetupModule
          ),
      },
      {
        path: 'symptoms',
        loadChildren: () =>
          import('./symptoms/symptoms-setup.module').then(
            (m) => m.SymptomsSetupModule
          ),
      },
      {
        path: 'findings',
        loadChildren: () =>
          import('./findings/findings-setup.module').then(
            (m) => m.FindingsSetupModule
          ),
      },
      {
        path: 'vital',
        loadChildren: () =>
          import('./vital/vital-setup.module').then(
            (m) => m.VitalSetupModule
          ),
      },
      {
        path: 'human-resource',
        loadChildren: () =>
          import('./human-resource/human-resource-setup.module').then(
            (m) => m.HumanResourceSetupModule
          ),
      },
      {
        path: 'appointment-setting',
        loadChildren: () =>
          import('./appointment/appointment-setup.module').then(
            (m) => m.AppointmentSetupModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
