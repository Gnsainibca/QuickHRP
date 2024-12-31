import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_SymptomsType } from '../../shared/models/master-symptoms-type';
import { SymptomsSetupService } from '../../shared/services/symptoms-setup.service';

@Component({
  selector: 'app-setup-symptoms-type-form',
  templateUrl: './setup-symptoms-type-form.component.html',
  styleUrls: ['./setup-symptoms-type-form.component.scss']
})
export class SetupSymptomsTypeFormComponent {
  symptomsTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: SymptomsSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.symptomsTypeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let symptomsType = this.service.getSymptomsType(this.id) as Master_SymptomsType;
      this.f['name'].setValue(symptomsType.name);
    }
  }

  get f() {
    return this.symptomsTypeForm.controls;
  }

  onSubmit() {
    this.symptomsTypeForm.markAllAsTouched();
    if (this.symptomsTypeForm.valid) {
      const symptomsType: Master_SymptomsType = this.symptomsTypeForm.getRawValue();
      if (this.isEdit) {
        symptomsType.id = this.id!;
        this.service.updateSymptomsType(symptomsType);
      }
      else {
        symptomsType.isActive = true;
        this.service.addSymptomsType(symptomsType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Symptoms type has been updated successfully!' : 'Symptoms type has been added successfully!', 'Success!');
    }
  }
}
