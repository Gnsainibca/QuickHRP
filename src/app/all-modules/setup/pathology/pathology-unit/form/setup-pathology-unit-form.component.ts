import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_PathologyUnit } from '../../shared/models/master-pathology-unit';
import { PathologySetupService } from '../../shared/services/pathology-setup.service';

@Component({
  selector: 'app-setup-pathology-unit-form',
  templateUrl: './setup-pathology-unit-form.component.html',
  styleUrls: ['./setup-pathology-unit-form.component.scss']
})
export class SetupPathologyUnitFormComponent {
  pathologyUnitForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PathologySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.pathologyUnitForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let pathologyUnit = this.service.getPathologyUnit(this.id) as Master_PathologyUnit;
      this.f['name'].setValue(pathologyUnit.name);
    }
  }

  get f() {
    return this.pathologyUnitForm.controls;
  }

  onSubmit() {
    this.pathologyUnitForm.markAllAsTouched();
    if (this.pathologyUnitForm.valid) {
      const pathologyUnit: Master_PathologyUnit = this.pathologyUnitForm.getRawValue();
      if (this.isEdit) {
        pathologyUnit.id = this.id!;
        this.service.updatePathologyUnit(pathologyUnit);
      }
      else {
        pathologyUnit.isActive = true;
        this.service.addPathologyUnit(pathologyUnit);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Pathology unit has been updated successfully!' : 'Pathology unit has been added successfully!', 'Success!');
    }
  }
}
