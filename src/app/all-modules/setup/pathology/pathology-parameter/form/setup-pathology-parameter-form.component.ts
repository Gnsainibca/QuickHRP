import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_PathologyUnit } from '../../shared/models/master-pathology-unit';
import { PathologySetupService } from '../../shared/services/pathology-setup.service';
import { Master_PathologyParameter } from '../../shared/models/master-pathology-parameter';

@Component({
  selector: 'app-setup-pathology-parameter-form',
  templateUrl: './setup-pathology-parameter-form.component.html',
  styleUrls: ['./setup-pathology-parameter-form.component.scss']
})
export class SetupPathologyParameterFormComponent {
  pathologyParameterForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  pathologyUnits: Array<Master_PathologyUnit> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PathologySetupService) {
    this.pathologyUnits = service.getPathologyUnitList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.pathologyParameterForm = this.fb.group({
      name: [null, [Validators.required]],
      referenceRange: [null, [Validators.required]],
      pathologyUnitId: ['', [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let pathologyParameter = this.service.getPathologyParameter(this.id) as Master_PathologyParameter;
      this.f['name'].setValue(pathologyParameter.name);
      this.f['referenceRange'].setValue(pathologyParameter.referenceRange);
      this.f['pathologyUnitId'].setValue(pathologyParameter.pathologyUnitId);
      this.f['description'].setValue(pathologyParameter.description);
    }
  }

  get f() {
    return this.pathologyParameterForm.controls;
  }

  onSubmit() {
    this.pathologyParameterForm.markAllAsTouched();
    if (this.pathologyParameterForm.valid) {
      const pathologyParameter: Master_PathologyParameter = this.pathologyParameterForm.getRawValue();
      if (this.isEdit) {
        pathologyParameter.id = this.id!;
        this.service.updatePathologyParameter(pathologyParameter);
      }
      else {
        pathologyParameter.isActive = true;
        this.service.addPathologyParameter(pathologyParameter);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Pathology parameter has been updated successfully!' : 'Pathology parameter has been added successfully!', 'Success!');
    }
  }
}
