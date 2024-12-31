import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Source } from '../../shared/models/master-source';
import { FrontOfficeSetupService } from '../../shared/services/front-office-setup.service';

@Component({
  selector: 'app-setup-source-form',
  templateUrl: './setup-source-form.component.html',
  styleUrls: ['./setup-source-form.component.scss']
})
export class SetupSourceFormComponent {
  sourceForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: FrontOfficeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.sourceForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let source = this.service.getSource(this.id) as Master_Source;
      this.f['name'].setValue(source.name);
      this.f['description'].setValue(source.description);
    }
  }

  get f() {
    return this.sourceForm.controls;
  }

  onSubmit() {
    this.sourceForm.markAllAsTouched();
    if (this.sourceForm.valid) {
      const source: Master_Source = this.sourceForm.getRawValue();
      if (this.isEdit) {
        source.id = this.id!;
        this.service.updateSource(source);
      }
      else {
        source.isActive = true;
        this.service.addSource(source);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Source has been updated successfully!' : 'Source has been added successfully!', 'Success!');
    }
  }
}
