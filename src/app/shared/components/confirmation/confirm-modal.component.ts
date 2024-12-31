import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="border-0 btn btn-danger btn-gradient-danger btn-rounded" (click)="activeModal.close(true)">&nbsp;&nbsp;Yes&nbsp;&nbsp;</button>
      <button type="button" class="btn btn-secondary btn-rounded" (click)="activeModal.close(false)">&nbsp;&nbsp;No&nbsp;&nbsp;</button>
    </div>
  `
})
export class ConfirmationModalContent {
  @Input() confirmationBoxTitle !:string;
  @Input() confirmationMessage!:string;

  constructor(public activeModal: NgbActiveModal) {}
}