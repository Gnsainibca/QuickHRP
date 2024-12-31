import { Component, Input } from '@angular/core';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { CallLog } from '../../shared/models/call-log';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-call-log-view',
  templateUrl: './call-log-view.component.html',
  styleUrls: ['./call-log-view.component.scss']
})
export class CallLogViewComponent {

  @Input() callLogId: number = 0;
  public callLog !: CallLog;

  constructor(public activeModal: NgbActiveModal, private data: FrontOfficeDataService) {
    this.callLog = this.data.getCallLogById(this.callLogId);
  }
}
