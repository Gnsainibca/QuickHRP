import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeDetails } from '../../shared/models/master_hospital-charge';

@Component({
  selector: 'app-setup-hospital-charge-view',
  standalone: true,
  templateUrl: './setup-hospital-charge-view.component.html',
  styleUrls: ['./setup-hospital-charge-view.component.scss']
})
export class SetupHospitalChargeViewComponent {

  @Input() id: number = 0;
  public hospitalCharge !: Master_HospitalChargeDetails;

  constructor(public activeModal: NgbActiveModal, private service: HospitalChargeSetupService) {
  }

  ngOnInit() {
    this.hospitalCharge = this.service.getHospitalCharge(this.id);
  }
}
