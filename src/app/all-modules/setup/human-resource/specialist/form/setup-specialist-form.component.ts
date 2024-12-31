import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_Specialist } from '../../shared/models/master-specialist';
import { HumanResourceSetupService } from '../../shared/services/human-resource-setup.service';

@Component({
  selector: 'app-setup-specialist-form',
  templateUrl: './setup-specialist-form.component.html',
  styleUrls: ['./setup-specialist-form.component.scss']
})
export class SetupSpecialistFormComponent {
  specialistForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HumanResourceSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.specialistForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let specialist = this.service.getSpecialist(this.id) as Master_Specialist;
      this.f['name'].setValue(specialist.name);
    }
  }

  get f() {
    return this.specialistForm.controls;
  }

  onSubmit() {
    this.specialistForm.markAllAsTouched();
    if (this.specialistForm.valid) {
      const specialist: Master_Specialist = this.specialistForm.getRawValue();
      if (this.isEdit) {
        specialist.id = this.id!;
        this.service.updateSpecialist(specialist);
      }
      else {
        specialist.isActive = true;
        this.service.addSpecialist(specialist);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Specialist has been updated successfully!' : 'Specialist has been added successfully!', 'Success!');
    }
  }
}
