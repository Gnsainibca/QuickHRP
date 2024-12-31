import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineGroup } from '../../shared/models/master-medicine-group';

@Component({
  selector: 'app-setup-medicine-group-form',
  templateUrl: './setup-medicine-group-form.component.html',
  styleUrls: ['./setup-medicine-group-form.component.scss']
})
export class SetupMedicineGroupFormComponent {
  medicineGroupForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineGroupForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineGroup = this.service.getMedicineGroup(this.id) as Master_MedicineGroup;
      this.f['name'].setValue(medicineGroup.name);
    }
  }

  get f() {
    return this.medicineGroupForm.controls;
  }

  onSubmit() {
    this.medicineGroupForm.markAllAsTouched();
    if (this.medicineGroupForm.valid) {
      const medicineGroup: Master_MedicineGroup = this.medicineGroupForm.getRawValue();
      if (this.isEdit) {
        medicineGroup.id = this.id!;
        this.service.updateMedicineGroup(medicineGroup);
      }
      else {
        medicineGroup.isActive = true;
        this.service.addMedicineGroup(medicineGroup);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine group has been updated successfully!' : 'Medicine group has been added successfully!', 'Success!');
    }
  }
}
