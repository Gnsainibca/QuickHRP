import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_SymptomsType } from '../../shared/models/master-symptoms-type';
import { SymptomsSetupService } from '../../shared/services/symptoms-setup.service';
import { Master_SymptomsHead } from '../../shared/models/master-symptoms-head';

@Component({
  selector: 'app-setup-symptoms-head-form',
  templateUrl: './setup-symptoms-head-form.component.html',
  styleUrls: ['./setup-symptoms-head-form.component.scss']
})
export class SetupSymptomsHeadFormComponent {
  symptomsHeadForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  symptomsTypes: Array<Master_SymptomsType> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: SymptomsSetupService) {
    this.symptomsTypes = service.getSymptomsTypeList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.symptomsHeadForm = this.fb.group({
      name: [null, [Validators.required]],
      typeId: ['', [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let symptomsHead = this.service.getSymptomsHead(this.id) as Master_SymptomsHead;
      this.f['name'].setValue(symptomsHead.name);
      this.f['typeId'].setValue(symptomsHead.typeId);
      this.f['description'].setValue(symptomsHead.description);
    }
  }

  get f() {
    return this.symptomsHeadForm.controls;
  }

  onSubmit() {
    this.symptomsHeadForm.markAllAsTouched();
    if (this.symptomsHeadForm.valid) {
      const symptomsHead: Master_SymptomsHead = this.symptomsHeadForm.getRawValue();
      if (this.isEdit) {
        symptomsHead.id = this.id!;
        this.service.updateSymptomsHead(symptomsHead);
      }
      else {
        symptomsHead.isActive = true;
        this.service.addSymptomsHead(symptomsHead);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Symptoms head has been updated successfully!' : 'Symptoms head has been added successfully!', 'Success!');
    }
  }
}
