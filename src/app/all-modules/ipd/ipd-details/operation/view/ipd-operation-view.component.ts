import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OperationList } from 'src/app/all-modules/opd/shared/models/operation';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';

@Component({
  selector: 'app-ipd-operation-view',
  standalone : true,
  templateUrl: './ipd-operation-view.component.html',
  styleUrls: ['./ipd-operation-view.component.scss']
})
export class IPDOperationViewComponent {
  
  @Input() operationId: number = 0;
  @Input() opdPatientId : number = 0;
  public operation !: OperationList;

  constructor(public activeModal: NgbActiveModal, private data: OpdDataService) {
  }

  ngOnInit() {
    this.operation = this.data.getOperationList(this.opdPatientId).find(x => x.id == this.operationId)!;
  }
}
