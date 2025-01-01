import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { FrontOfficeDataService } from '../../shared/services/front-office.service';
import { Postal } from '../../shared/models/postal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postal-form',
  templateUrl: './postal-form.component.html',
  styleUrls: ['./postal-form.component.scss']
})
export class PostalFormComponent {
  postalForm!: UntypedFormGroup;
  visitToOptions!: Array<string>;
  relatedToOptions!: Array<string>
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, 
    private fb: FormBuilder, private data: FrontOfficeDataService) {
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.postalForm = this.fb.group({
      fromTitle: [null, [Validators.required]],
      referenceNo: [null, [Validators.required]],
      toTitle: [null, [Validators.required]],
      address: [null],
      note: [null],
      date: [new Date(), [Validators.required]],
      type: ['', [Validators.required]]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let postal = this.data.getPostalById(this.id);
      this.f['fromTitle'].setValue(postal.fromTitle);
      this.f['referenceNo'].setValue(postal.referenceNo);
      this.f['toTitle'].setValue(postal.toTitle);
      this.f['note'].setValue(postal.note);
      this.f['date'].setValue(new Date(postal.date));
      this.f['type'].setValue(postal.type);
    }
  }

  private setFormData() {
    this.visitToOptions = this.data.visitToOptions;
  }

  get f() {
    return this.postalForm.controls;
  }

  onSubmit() {
    this.postalForm.markAllAsTouched();
    if (this.postalForm.valid) {
      const postal: Postal = this.postalForm.getRawValue();
      if (this.isEdit) {
        postal.id = this.id!;
        this.data.updatePostal(postal);
      }
      else {
        this.data.addPostal(postal);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Postal has been updated successfully!' : 'Postal has been added successfully!', 'Success!');
    }
  }
}
