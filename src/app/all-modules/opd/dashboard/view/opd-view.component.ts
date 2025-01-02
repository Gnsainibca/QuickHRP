import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OpdDataService } from '../../shared/services/opd.service';
import { OpdPatientList } from '../../shared/models/opd-patient-list';

@Component({
  selector: 'app-opd-view',
  templateUrl: './opd-view.component.html',
  styleUrls: ['./opd-view.component.scss']
})
export class OpdViewComponent {
  
  @Input() patientVisitId: number = 0;
  public opdPatient !: OpdPatientList;

  constructor(public activeModal: NgbActiveModal, private data: OpdDataService) {
    
  }

  ngOnInit(){
    this.opdPatient = this.data.getOpdPatientList(this.patientVisitId).find(x => x.patientVisitId == this.patientVisitId)!;
  }
}
