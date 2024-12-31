import { Component, Input } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { OpdDataService } from '../../../shared/services/opd.service';
import { Payment } from '../../../shared/models/payment';

@Component({
  selector: 'app-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent {
  @Input() opdPatientId : number = 0;
  public routes = routes;
  public payments : Array<Payment> = []
  
  constructor(private opdDataService : OpdDataService) { }

  ngOnInit() {
    this.payments = this.opdDataService.getPaymentList(this.opdPatientId);
  }
}
