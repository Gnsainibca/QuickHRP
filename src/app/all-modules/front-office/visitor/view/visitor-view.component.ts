import { Component, Input } from '@angular/core';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VisitorList } from '../../shared/models/visitor';

@Component({
  selector: 'app-visitor-view',
  templateUrl: './visitor-view.component.html',
  styleUrls: ['./visitor-view.component.scss']
})
export class VisitorViewComponent {

  @Input() visitorId: number = 0;
  public visitor !: VisitorList;

  constructor(public activeModal: NgbActiveModal, private data: FrontOfficeDataService) {
    this.visitor = this.data.getVisitorById(this.visitorId);
  }
}
