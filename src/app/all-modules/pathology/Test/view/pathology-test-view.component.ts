import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyDataService } from '../../shared/services/pathology-data.service';
import { PathologyTestList } from '../../shared/models/pathology';

@Component({
  selector: 'app-pathology-test-view',
  templateUrl: './pathology-test-view.component.html',
  styleUrls: ['./pathology-test-view.component.scss']
})
export class PathologyTestViewComponent {

  @Input() id: number = 0;
  public pathologyTest !: PathologyTestList;

  constructor(public activeModal: NgbActiveModal, private data: PathologyDataService) {
    this.pathologyTest = this.data.getPathologyTestById(this.id);
  }
}
