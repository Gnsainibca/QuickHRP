import { Component, Input } from '@angular/core';
import { routes, ToasterService } from 'src/app/shared/core.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalContent } from 'src/app/shared/components/confirmation/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { IPDNurseNoteFormComponent } from '../form/ipd-nurse-note-form.component';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IPDNurseNoteCommentFormComponent } from '../comment-form/ipd-nurse-note-comment-form.component';
import { NurseNote } from '../../../shared/models/nurse-note';

@Component({
  selector: 'app-ipd-nurse-note-list',
  templateUrl: './ipd-nurse-note-list.component.html',
  styleUrls: ['./ipd-nurse-note-list.component.scss']
})
export class IPDNurseNoteListComponent {
  public nurseNotes: Array<NurseNote> = [];
  public pagination: boolean = true;
  public paginationPageSize = 10;
  public paginationPageSizeSelector = [10, 15, 20, 100];
  private ipdPatientId: number = 0;
  public routes = routes;
  @Input() hasPatientDischarged: boolean = false;
  
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private data: IpdDataService, private toaster: ToasterService) {
    this.ipdPatientId = this.route.snapshot.params['id']!;
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public add() {
    this.openModal_Add();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  public delete(id: number) {
    this.openModal_DeleteConfirmation(id);
  }

  public addComment(nurseNoteId: number) {
    this.openModal_AddComment(nurseNoteId);
  }

  public deleteComment(id: number) {
    this.openModal_DeleteCommentConfirmation(id);
  }

  private openModal_Add() {
    const modalRef = this.modalService.open(IPDNurseNoteFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_AddComment(nurseNoteId: number) {
    const modalRef = this.modalService.open(IPDNurseNoteCommentFormComponent, { backdrop: 'static', scrollable: true, size: 'lg' });
    modalRef.componentInstance.nurseNoteId = nurseNoteId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(IPDNurseNoteFormComponent, { windowClass: 'right', backdrop: 'static', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.ipdPatientId = this.ipdPatientId;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  private openModal_DeleteConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteNurseNote(id);
        this.toaster.typeSuccess('Nurse note has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private openModal_DeleteCommentConfirmation(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Are you sure you want to delete this ?';

    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.data.deleteNurseNoteComment(id);
        this.toaster.typeSuccess('Comment has been deleted successfully!', 'Success!');
        this.refereshGrid();
      }
    });
  }

  private getList(): void {
    this.nurseNotes = this.data.getNurseNoteList(this.ipdPatientId).sort((a, b) => b.id - a.id);
  }
}
