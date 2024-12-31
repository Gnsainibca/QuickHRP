import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RadiologyDataService } from '../../shared/services/radiology-data.service';
import { RadiologyTestList } from '../../shared/models/radiology';

@Component({
  selector: 'app-radiology-test-view',
  templateUrl: './radiology-test-view.component.html',
  styleUrls: ['./radiology-test-view.component.scss']
})
export class RadiologyTestViewComponent {

  @Input() id: number = 0;
  public radiologyTest !: RadiologyTestList;

  constructor(public activeModal: NgbActiveModal, private data: RadiologyDataService) {
    this.radiologyTest = this.data.getRadiologyTestById(this.id);
  }
}
