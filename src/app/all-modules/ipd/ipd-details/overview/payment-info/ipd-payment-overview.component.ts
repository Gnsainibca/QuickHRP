import { Component, Input } from '@angular/core';
import { Payment } from 'src/app/all-modules/opd/shared/models/payment';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { routes } from 'src/app/shared/core.index';

@Component({
  selector: 'app-ipd-payment-overview',
  templateUrl: './ipd-payment-overview.component.html',
  styleUrls: ['./ipd-payment-overview.component.scss']
})
export class IPDPaymentOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public payments : Array<Payment> = []
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.payments = this.opdDataService.getPaymentList(this.opdPatientId);
  }
}
