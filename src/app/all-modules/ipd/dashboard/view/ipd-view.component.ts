import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IpdPatientList } from '../../shared/models/ipd-patient-list';
import { IpdDataService } from '../../shared/servives/Ipd.service';

@Component({
  selector: 'app-ipd-view',
  standalone : true,
  templateUrl: './ipd-view.component.html',
  styleUrls: ['./ipd-view.component.scss']
})
export class IpdViewComponent {
  
  @Input() id: number = 0;
  public ipdPatient !: IpdPatientList;

  constructor(public activeModal: NgbActiveModal, private data: IpdDataService) {
    
  }

  ngOnInit(){
    this.ipdPatient = this.data.getIpdPatientById(this.id);
  }
}
