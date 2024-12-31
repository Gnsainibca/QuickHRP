import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllModulesComponent } from './all-modules.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
const routes: Routes = [
  {
    path: '',
    component: AllModulesComponent,
    children: [
      {
        path: '',
        redirectTo: 'appointment',
        pathMatch: 'full',
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then(
            (m) => m.BillingModule
          ),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./appointment/appointment.module').then(
            (m) => m.AppointmentModule
          ),
      },
      {
        path: ':module/appointment',
        loadChildren: () =>
          import('./appointment/appointment.module').then(
            (m) => m.AppointmentModule
          ),
      },
      {
        path: 'opd',
        loadChildren: () =>
          import('./opd/opd.module').then(
            (m) => m.OpdModule
          ),
      },
      {
        path: ':module/opd',
        loadChildren: () =>
          import('./opd/opd.module').then(
            (m) => m.OpdModule
          ),
      },
      {
        path: 'ipd',
        loadChildren: () =>
          import('./ipd/ipd.module').then(
            (m) => m.IpdModule
          ),
      },
      {
        path: ':module/ipd',
        loadChildren: () =>
          import('./ipd/ipd.module').then(
            (m) => m.IpdModule
          ),
      },
      {
        path: 'front-office',
        loadChildren: () =>
          import('./front-office/front-office.module').then(
            (m) => m.FrontOfficeModule
          ),
      },
      {
        path: 'pharmacy',
        loadChildren: () =>
          import('./pharmacy/pharmacy.module').then(
            (m) => m.PharmacyModule
          ),
      },
      {
        path: ':module/pharmacy',
        loadChildren: () =>
          import('./pharmacy/pharmacy.module').then(
            (m) => m.PharmacyModule
          ),
      },
      {
        path: 'pathology',
        loadChildren: () =>
          import('./pathology/pathology.module').then(
            (m) => m.PathologyModule
          ),
      },
      {
        path: ':module/pathology',
        loadChildren: () =>
          import('./pathology/pathology.module').then(
            (m) => m.PathologyModule
          ),
      },
      {
        path: 'radiology',
        loadChildren: () =>
          import('./radiology/radiology.module').then(
            (m) => m.RadiologyModule
          ),
      },
      {
        path: ':module/radiology',
        loadChildren: () =>
          import('./radiology/radiology.module').then(
            (m) => m.RadiologyModule
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then(
            (m) => m.StaffModule
          ),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then(
            (m) => m.PatientModule
          ),
      },
      {
        path: 'setup',
        loadChildren: () =>
          import('./setup/setup.module').then(
            (m) => m.SetupModule
          ),
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  // { path: '**', redirectTo : 'login' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModulesRoutingModule {}
