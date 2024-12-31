import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDataService } from '../../shared/services/appointment-data.service';
import { AppointmentList } from '../../shared/models/appointment';

@Component({
  selector: 'app-appointment-view',
  standalone: true,
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent {

  @Input() appointmentId: number = 0;
  public appointment !: AppointmentList;

  constructor(public activeModal: NgbActiveModal, private data: AppointmentDataService) {
    this.appointment = this.data.getAppointmentById(this.appointmentId);
  }
}
