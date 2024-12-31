import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HumanResourceSetupService } from '../../shared/services/human-resource-setup.service';
import { Master_ContractType } from '../../shared/models/master-contract-type';

@Component({
  selector: 'app-setup-contract-type-form',
  templateUrl: './setup-contract-type-form.component.html',
  styleUrls: ['./setup-contract-type-form.component.scss']
})
export class SetupContractTypeFormComponent {
  contractTypeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HumanResourceSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.contractTypeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let contractType = this.service.getContractType(this.id) as Master_ContractType;
      this.f['name'].setValue(contractType.name);
    }
  }

  get f() {
    return this.contractTypeForm.controls;
  }

  onSubmit() {
    this.contractTypeForm.markAllAsTouched();
    if (this.contractTypeForm.valid) {
      const contractType: Master_ContractType = this.contractTypeForm.getRawValue();
      if (this.isEdit) {
        contractType.id = this.id!;
        this.service.updateContractType(contractType);
      }
      else {
        contractType.isActive = true;
        this.service.addContractType(contractType);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Contract type has been updated successfully!' : 'Contract type has been added successfully!', 'Success!');
    }
  }
}
