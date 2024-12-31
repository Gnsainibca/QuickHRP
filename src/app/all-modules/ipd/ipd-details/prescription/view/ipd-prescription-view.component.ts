import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IpdPrescriptionView } from '../../../shared/models/ipd-prescription';

@Component({
  selector: 'app-ipd-prescription-view',
  templateUrl: './ipd-prescription-view.component.html',
  styleUrls: ['./ipd-prescription-view.component.scss']
})
export class IpdPrescriptionViewComponent {
  
  @Input() id: number = 0;
  prescription !: IpdPrescriptionView;
  @Output() onEdit = new EventEmitter<number>();

  constructor(public activeModal: NgbActiveModal, private data: IpdDataService) {
  }

  ngOnInit() {
    this.prescription = this.data.getPrescriptionById(this.id);
  }

  edit(){
    this.onEdit.next(this.prescription.id);
  }
}
