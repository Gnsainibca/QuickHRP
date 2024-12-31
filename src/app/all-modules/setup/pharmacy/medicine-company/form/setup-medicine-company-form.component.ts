import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacySetupService } from '../../shared/services/pharmacy-setup.service';
import { Master_MedicineCompany } from '../../shared/models/master-medicine-company';

@Component({
  selector: 'app-setup-medicine-company-form',
  templateUrl: './setup-medicine-company-form.component.html',
  styleUrls: ['./setup-medicine-company-form.component.scss']
})
export class SetupMedicineCompanyFormComponent {
  medicineCompanyForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: PharmacySetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.medicineCompanyForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let medicineCompany = this.service.getMedicineCompany(this.id) as Master_MedicineCompany;
      this.f['name'].setValue(medicineCompany.name);
    }
  }

  get f() {
    return this.medicineCompanyForm.controls;
  }

  onSubmit() {
    this.medicineCompanyForm.markAllAsTouched();
    if (this.medicineCompanyForm.valid) {
      const medicineCompany: Master_MedicineCompany = this.medicineCompanyForm.getRawValue();
      if (this.isEdit) {
        medicineCompany.id = this.id!;
        this.service.updateMedicineCompany(medicineCompany);
      }
      else {
        medicineCompany.isActive = true;
        this.service.addMedicineCompany(medicineCompany);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medicine company has been updated successfully!' : 'Medicine company has been added successfully!', 'Success!');
    }
  }
}
