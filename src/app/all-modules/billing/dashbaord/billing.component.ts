import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/core.index';
import { BillingModules } from 'src/app/shared/enums/billing-module';
import { BillingService } from '../shared/services/billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {

  billingModule = BillingModules;
  caseId !: string;
  isValidCaseId: boolean = true;

  constructor(private router: Router, private billingService: BillingService) { }

  ngOnInit() { }

  redirectToModule(module: BillingModules) {
    switch (module) {
      case BillingModules.Appointment:
        {
          this.router.navigate([routes.billingAppointment]);
          break;
        }
      case BillingModules.OPD:
        {
          this.router.navigate([routes.billingOpd]);
          break;
        }
      case BillingModules.IPD:
        {
          this.router.navigate([routes.billingIpd]);
          break;
        }
      case BillingModules.Pharmacy:
        {
          this.router.navigate([routes.billingPharmacy]);
          break;
        }
      case BillingModules.Pathology:
        {
          this.router.navigate([routes.billingPathology]);
          break;
        }
      case BillingModules.Radiology:
        {
          this.router.navigate([routes.billingRadiology]);
          break;
        }
    }
  }

  search() {
    let opdIpdPatientId = this.billingService.getOpdIpdPatientIdByCaseId(this.caseId);
    this.isValidCaseId = false;
    if (opdIpdPatientId?.id) {
      this.isValidCaseId = true;
      let route = '';
      if (opdIpdPatientId.name == 'opd') {
        route = routes.billingOpd + `/patient/visit-details/${opdIpdPatientId.id}/Payments`;
      } else {
        route = routes.billingIpd + `/patient/${opdIpdPatientId.id}/Payments`;
      }
      this.router.navigate([route]);
    }
  }
}
