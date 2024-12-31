import { Component, Input } from '@angular/core';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplainList } from '../../shared/models/complain';

@Component({
  selector: 'app-complain-view',
  templateUrl: './complain-view.component.html',
  styleUrls: ['./complain-view.component.scss']
})
export class ComplainViewComponent {

  @Input() complainId: number = 0;
  public complain !: ComplainList;

  constructor(public activeModal: NgbActiveModal, private data: FrontOfficeDataService) {
    
  }

  ngOnInit() {
    this.complain = this.data.getComplainById(this.complainId);
  }
}
