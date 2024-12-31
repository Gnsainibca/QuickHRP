import { Component, Input } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { MedicationGroupedList } from 'src/app/all-modules/opd/shared/models/medication';
import { IPDMedicationFormComponent } from './form/ipd-medication-form.component';

@Component({
  selector: 'app-ipd-medication',
  templateUrl: './ipd-medication.component.html',
  styleUrls: ['./ipd-medication.component.scss']
})
export class IPDMedicationComponent {
  @Input() hasPatientDischarged: boolean = false;
  public groupedMedications: Array<MedicationGroupedList> = [];
  private opdPatientId : number = 0;
  public routes = routes;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private data: OpdDataService, private toaster: ToasterService) { }

  ngOnInit() {
    this.opdPatientId = this.route.snapshot.params['id']!;
    this.getList();
  }

  public add() {
    this.openModal_Add();
  }

  public addMore(dateAddFor: Date, timeAddFor: string) {
    this.openModal_Add(dateAddFor, timeAddFor);
  }

  private openModal_Add(dateAddFor?: Date, timeAddFor?: string) {
    const modalRef = this.modalService.open(IPDMedicationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.dateAddFor = dateAddFor;
    modalRef.componentInstance.timeAddFor = timeAddFor;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.getList();
      modalRef.close();
    });
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDMedicationFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.opdPatientId = this.opdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.getList();
      modalRef.close();
    });
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteMedication(id);
        this.toaster.typeSuccess('Medication has been deleted successfully!', 'Success!');
        this.getList();
      }
    });
  }

  private getList(): void {
    this.groupedMedications = this.data.getMedicationList(this.opdPatientId);
  }
}
