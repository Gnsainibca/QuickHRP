import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { PharmacyList } from '../../shared/models/pharmacy';

@Component({
  selector: 'app-pharmacy-view',
  templateUrl: './pharmacy-view.component.html',
  styleUrls: ['./pharmacy-view.component.scss']
})
export class PharmacyViewComponent {

  @Input() id: number = 0;
  public pharmacy !: PharmacyList;

  constructor(public activeModal: NgbActiveModal, private data: PharmacyService) {
  }

  ngOnInit() {
    this.pharmacy = this.data.getPharmacyList().find(x => x.id == this.id)!;
  }
}
