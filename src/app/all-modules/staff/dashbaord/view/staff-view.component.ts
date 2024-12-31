import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../../shared/services/staff-data.service';
import { StaffDetail } from '../../shared/models/staff';
import { StaffFormComponent } from '../form/staff-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.scss'],
})
export class StaffViewComponent {
  @Input() id: number = 0;
  staff !: StaffDetail;
  @Output() onDelete = new EventEmitter<boolean>();

  dropdownSettings = {};

  constructor(public activeModal: NgbActiveModal, private staffService: StaffService, private modalService: NgbModal, private toaster: ToasterService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.staff = this.staffService.getStaffById(this.id);
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }


  downloadResume() {
    const downloadLink = document.createElement('a');
    const fileName = this.staff.resumeFileName;
    downloadLink.href = this.staff.resumeDocument;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  downloadJoiningLetter() {
    const downloadLink = document.createElement('a');
    const fileName = this.staff.resignationLetterFileName;
    downloadLink.href = this.staff.resignationLetterDocument;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  downloadResignationLetter() {
    const downloadLink = document.createElement('a');
    const fileName = this.staff.resignationLetterFileName;
    downloadLink.href = this.staff.resignationLetterDocument;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  downloadOtherDocuments() {
    const downloadLink = document.createElement('a');
    const fileName = this.staff.otherFileName;
    downloadLink.href = this.staff.resumeDocument;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(StaffFormComponent, { windowClass: 'right size-full', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.ngOnInit();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.staffService.deleteStaff(id);
        this.toaster.typeSuccess('Staff details has been deleted successfully!', 'Success!');
        this.onDelete.next(true);
      }
    });
  }
}
