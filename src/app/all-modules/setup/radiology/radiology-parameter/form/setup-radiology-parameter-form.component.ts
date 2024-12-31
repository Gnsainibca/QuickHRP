import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_RadiologyUnit } from '../../shared/models/master-radiology-unit';
import { RadiologySetupService } from '../../shared/services/radiology-setup.service';
import { Master_RadiologyParameter } from '../../shared/models/master-radiology-parameter';

@Component({
  selector: 'app-setup-radiology-parameter-form',
  templateUrl: './setup-radiology-parameter-form.component.html',
  styleUrls: ['./setup-radiology-parameter-form.component.scss']
})
export class SetupRadiologyParameterFormComponent {
  radiologyParameterForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  radiologyUnits: Array<Master_RadiologyUnit> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: RadiologySetupService) {
    this.radiologyUnits = service.getRadiologyUnitList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.radiologyParameterForm = this.fb.group({
      name: [null, [Validators.required]],
      referenceRange: [null, [Validators.required]],
      radiologyUnitId: ['', [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let radiologyParameter = this.service.getRadiologyParameter(this.id) as Master_RadiologyParameter;
      this.f['name'].setValue(radiologyParameter.name);
      this.f['referenceRange'].setValue(radiologyParameter.referenceRange);
      this.f['radiologyUnitId'].setValue(radiologyParameter.radiologyUnitId);
      this.f['description'].setValue(radiologyParameter.description);
    }
  }

  get f() {
    return this.radiologyParameterForm.controls;
  }

  onSubmit() {
    this.radiologyParameterForm.markAllAsTouched();
    if (this.radiologyParameterForm.valid) {
      const radiologyParameter: Master_RadiologyParameter = this.radiologyParameterForm.getRawValue();
      if (this.isEdit) {
        radiologyParameter.id = this.id!;
        this.service.updateRadiologyParameter(radiologyParameter);
      }
      else {
        radiologyParameter.isActive = true;
        this.service.addRadiologyParameter(radiologyParameter);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Radiology parameter has been updated successfully!' : 'Radiology parameter has been added successfully!', 'Success!');
    }
  }
}
