import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { BillingInfo } from '../../../shared/models/billing-info';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss']
})
export class BillingOverviewComponent {
  @Input() opdPatientId: number = 0;
  public routes = routes;
  public opdBillingInfo !: BillingInfo;
  public billingInfo_NotImplemented: BillingInfo = { charge: 0, paid: 0, percentage: 0, progressClass: 'bg-info' };

  constructor(private opdDataService: OpdDataService) { }

  ngOnInit() {
    this.opdBillingInfo = this.opdDataService.getOpdBillingInfo(this.opdPatientId);
  }
}
