import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'image-viewer-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{name}}</h4>
      &nbsp;&nbsp;<i class="fa fa-download" style="cursor:pointer;font-size:20px" (click)="download()"></i>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body" style="text-align: center;">
      <img style="max-height : 80vh; width:auto;" [src]="data" />
    </div>
  `
})
export class ImageViewerModalContent {
  @Input() data !:string;
  @Input() name!:string;

  constructor(public activeModal: NgbActiveModal) {}

  download() {
    const downloadLink = document.createElement('a');
    const fileName =  this.name;
    downloadLink.href = this.data;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}