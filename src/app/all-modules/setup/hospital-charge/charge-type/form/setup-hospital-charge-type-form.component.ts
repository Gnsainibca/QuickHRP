import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';
import { Master_HospitalChargeType } from '../../shared/models/master_hospital-charge-type';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-setup-hospital-charge-type-form',
  templateUrl: './setup-hospital-charge-type-form.component.html',
  styleUrls: ['./setup-hospital-charge-type-form.component.scss']
})
export class SetupHospitalChargeTypeFormComponent {
  chargeTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  modules: Array<SimpleRecord> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService,
    commonService: CommonService) {
    this.modules = commonService.getChargeModules();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.chargeTypeForm = this.fb.group({
      name: [null, [Validators.required]],
      moduleInnerForm: new FormArray([])
    });
    this.modules.forEach(() => this.moduleInnerForm.push(new FormControl()));
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let chargeType = this.service.getChargeType(this.id) as Master_HospitalChargeType;
      this.f['name'].setValue(chargeType.name);
      this.modules.forEach((module, index) => {
        this.moduleInnerForm.controls[index]?.setValue(chargeType.moduleInnerForm.some(x => x.id === module.id));
      });
    }
  }

  get f() {
    return this.chargeTypeForm.controls;
  }

  get moduleInnerForm() {
    return this.chargeTypeForm.get('moduleInnerForm') as FormArray;
  }

  onSubmit() {
    this.chargeTypeForm.markAllAsTouched();
    if (this.chargeTypeForm.valid) {

      const chargeType: Master_HospitalChargeType = Object.assign({}, this.chargeTypeForm.getRawValue(), {
        moduleInnerForm: this.moduleInnerForm.controls.map((selected, i) => {
          return {
            id: this.modules[i].id,
            selected: selected.value
          }
        }).filter(x => x.selected)
      });

      if (this.isEdit) {
        chargeType.id = this.id!;
        this.service.updateChargeType(chargeType);
      }
      else {
        chargeType.isActive = true;
        this.service.addChargeType(chargeType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Charge type has been updated successfully!' : 'Charge type has been added successfully!', 'Success!');
    }
  }
}
