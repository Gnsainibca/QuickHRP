import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpdDataService } from '../../../shared/services/opd.service';
import { OperationList } from '../../../shared/models/operation';

@Component({
  selector: 'app-operation-view',
  standalone: true,
  templateUrl: './operation-view.component.html',
  styleUrls: ['./operation-view.component.scss']
})
export class OperationViewComponent {

  @Input() operationId: number = 0;
  @Input() opdPatientId: number = 0;
  public operation !: OperationList;

  constructor(public activeModal: NgbActiveModal, private data: OpdDataService) {
  }

  ngOnInit() {
    this.operation = this.data.getOperationList(this.opdPatientId).find(x => x.id == this.operationId)!;
  }
}
