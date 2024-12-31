import { Component, Input } from '@angular/core';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Postal } from '../../shared/models/postal';

@Component({
  selector: 'app-postal-view',
  templateUrl: './postal-view.component.html',
  styleUrls: ['./postal-view.component.scss']
})
export class PostalViewComponent {

  @Input() postalId: number = 0;
  public postal !: Postal;

  constructor(public activeModal: NgbActiveModal, private data: FrontOfficeDataService) {
    this.postal = this.data.getPostalById(this.postalId);
  }
}
