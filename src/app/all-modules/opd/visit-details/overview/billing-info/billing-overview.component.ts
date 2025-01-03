import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { BillingInfo } from '../../../shared/models/billing-info';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { PathologyDataService } from 'src/app/all-modules/pathology/shared/services/pathology-data.service';
import { RadiologyDataService } from 'src/app/all-modules/radiology/shared/services/radiology-data.service';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss']
})
export class BillingOverviewComponent {
  @Input() opdPatientId: number = 0;
  public routes = routes;
  public opdBillingInfo !: BillingInfo;
  public pharmacyBillingInfo !: BillingInfo;
  public pathologyBillingInfo !: BillingInfo;
  public radiologyBillingInfo !: BillingInfo;
  public billingInfo_NotImplemented: BillingInfo = { charge: 0, paid: 0, percentage: 0, progressClass: 'bg-info' };

  constructor(private opdDataService: OpdDataService, private pharmacyService: PharmacyService,
      private pathologyService: PathologyDataService, private radiologyService: RadiologyDataService) { }

  ngOnInit() {
    this.opdBillingInfo = this.fillBillingInfoOtherProperties(this.opdDataService.getOpdBillingInfo(this.opdPatientId));
    let caseId = this.opdDataService.getCaseIdByOpdPatientId(this.opdPatientId);
    this.pharmacyBillingInfo = this.fillBillingInfoOtherProperties(this.pharmacyService.getBillingInfo(caseId));
    this.pathologyBillingInfo = this.fillBillingInfoOtherProperties(this.pathologyService.getBillingInfo(caseId));
    this.radiologyBillingInfo = this.fillBillingInfoOtherProperties(this.radiologyService.getBillingInfo(caseId));
  }

  public fillBillingInfoOtherProperties(billInfo: BillingInfo): BillingInfo {
    let percentage = billInfo.charge > 0 ? (billInfo.paid * 100) / billInfo.charge : 0;
    percentage = percentage > 100 ? 100 : (percentage < 0 ? 0 : percentage);
    let progressClass = percentage >= 100 ? ' bg-success' : (percentage < 50 ? 'bg-danger' : 'bg-info');;

    let billingInfo: BillingInfo = {
      charge: billInfo.charge,
      paid: billInfo.paid,
      percentage: percentage,
      progressClass: progressClass
    };
    return billingInfo;
  }
}
