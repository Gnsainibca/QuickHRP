import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToasterService } from 'src/app/shared/core.index';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Medicine } from 'src/app/shared/models/medication';
import { Medication } from 'src/app/all-modules/opd/shared/models/medication';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { Master_MedicineUnit } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-unit';
import { Master_MedicineCategory } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-category';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { Master_MedicineDosageList } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-dosage';

@Component({
  selector: 'app-ipd-medication-form',
  templateUrl: './ipd-medication-form.component.html',
  styleUrls: ['./ipd-medication-form.component.scss']
})
export class IPDMedicationFormComponent {
  medicationForm!: UntypedFormGroup;
  medicineCategories: Array<Master_MedicineCategory> = [];
  medicines: Array<SimpleRecordWithParent> = [];
  filteredMedicines: Array<SimpleRecordWithParent> = [];
  medicineDosageUnits: Array<Master_MedicineDosageList> = [];
  filteredMedicineDosageUnits: Array<SimpleRecord> = [];
  @Input() dateAddFor?: Date;
  @Input() timeAddFor?: string;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  opdPatientId: number = 0;

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: OpdDataService,
    private pharmacySetupService: PharmacySetupService, private pharmacyService: PharmacyService) {
  }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.medicationForm = this.fb.group({
      opdPatientId: [this.opdPatientId, [Validators.required]],
      date: [this.dateAddFor, [Validators.required]],
      time: [this.timeAddFor, [Validators.required]],
      medicineCategoryId: ['', [Validators.required]],
      medicineId: ['', [Validators.required]],
      medicineUnitId: ['', [Validators.required]],
      remarks: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    let medication!: Medication;
    if (this.isEdit) {
      medication = this.data.getMedicationById(this.id);
      this.f['date'].setValue(new Date(medication.date));
      this.f['time'].setValue(medication.time);
      this.f['opdPatientId'].setValue(this.opdPatientId);
      this.f['medicineCategoryId'].setValue(medication.medicineCategoryId);
      this.onMedicineCategoryChange();
      this.f['medicineId'].setValue(medication.medicineId);
      this.f['medicineUnitId'].setValue(medication.medicineUnitId);
      this.f['remarks'].setValue(medication.remarks);
    }
  }

  private setFormData() {
    this.medicineCategories = this.pharmacySetupService.getMedicineCategoryList();
    this.medicineDosageUnits = this.pharmacySetupService.getMedicineDosageList();
    this.medicines = this.pharmacyService.getMedicineNameList();
  }

  onMedicineCategoryChange() {
    this.filteredMedicines = this.medicines.filter(x => x.parentId == this.f['medicineCategoryId'].value);
    this.filteredMedicineDosageUnits = this.medicineDosageUnits.
      filter(x => x.medicineCategoryId == this.f['medicineCategoryId'].value).map(item => {
        return {
          id: item.id,
          name: `${item.name} ${item.medicineUnit}`
        }
      });
  }

  get f() {
    return this.medicationForm.controls;
  }

  onSubmit() {
    this.medicationForm.markAllAsTouched();
    if (this.medicationForm.valid) {
      const medication: Medication = this.medicationForm.getRawValue();
      if (this.isEdit) {
        medication.id = this.id!;
        this.data.updateMedication(medication);
      }
      else {
        this.data.addMedication(medication);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Medication has been updated successfully!' : 'Medication has been added successfully!', 'Success!');
    }
  }
}

