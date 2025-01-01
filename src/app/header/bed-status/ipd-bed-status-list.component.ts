import { Component, EventEmitter, Output } from '@angular/core';
import { routes } from 'src/app/shared/core.index';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IpdDataService } from 'src/app/all-modules/ipd/shared/servives/Ipd.service';
import { Master_BedStaus_Floor } from './master-bed-status';

@Component({
  selector: 'app-ipd-bed-status-list',
  templateUrl: './ipd-bed-status-list.component.html',
  styleUrls: ['./ipd-bed-status-list.component.scss']
})
export class IPDBedStatusListComponent {
  public floors: Array<Master_BedStaus_Floor> = [];
  public routes = routes;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(private router: Router, public activeModal: NgbActiveModal, private ipdService: IpdDataService) {
  }

  ngOnInit() {
    this.getList();
  }

  redirectToPatientIPD(ipdPatientId: number) {
    this.router.navigate([`/ipd/patient/${ipdPatientId}/Overview`]);
    this.onSave.next(true);
  }

  redirectToAdmitPatient() {

  }

  private getList(): void {
    this.floors = this.ipdService.getBedListWithStatus();
  }
}
