import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { CommonService } from 'src/app/shared/data/common.service';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { PharmacyMedicine } from '../../shared/models/pharmacy';
import { ImageViewerModalContent } from 'src/app/shared/components/image-view/image-viewer-modal.component';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { Master_MedicineCategory } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-category';
import { Master_MedicineCompany } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-company';
import { Master_MedicineGroup } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-group';
import { Master_MedicineUnit } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-unit';

@Component({
  selector: 'pharmacy-medicine-form',
  templateUrl: './pharmacy-medicine-form.component.html',
  styleUrls: ['./pharmacy-medicine-form.component.scss']
})
export class PharmacyMedicineFormComponent {
  pharmacyMedicineForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  date: Date = new Date();
  patients: Array<SimpleRecord> = [];

  medicineCategories: Array<Master_MedicineCategory> = [];
  medicineCompanies: Array<Master_MedicineCompany> = [];
  medicineGroups: Array<Master_MedicineGroup> = [];
  units: Array<Master_MedicineUnit> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private data: PharmacyService, private commonService: CommonService, private modalService: NgbModal,
    pharmacySetupService: PharmacySetupService
  ) {
    this.medicineCategories = pharmacySetupService.getMedicineCategoryList();
    this.medicineCompanies = pharmacySetupService.getMedicineCompanyList();
    this.medicineGroups = pharmacySetupService.getMedicineGroupList();
    this.units = pharmacySetupService.getMedicineUnitList();
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.pharmacyMedicineForm = this.fb.group({
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      companyId: [''],
      composition: [''],
      groupId: [''],
      unitId: ['', [Validators.required]],
      minLevel: [null],
      reOrderLevel: [null],
      tax: [''],
      packing: [null, [Validators.required]],
      vatAC: [null],
      rackNumber: [null],
      note: [null],
      image: [null],
      imageName: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let pharmacyMedicine = this.data.getPharmacyMedicineById(this.id!)!;
      this.f['name'].setValue(pharmacyMedicine.name);
      this.f['categoryId'].setValue(pharmacyMedicine.categoryId);
      this.f['companyId'].setValue(pharmacyMedicine.companyId);
      this.f['composition'].setValue(pharmacyMedicine.composition);
      this.f['groupId'].setValue(pharmacyMedicine.groupId);
      this.f['unitId'].setValue(pharmacyMedicine.unitId);
      this.f['minLevel'].setValue(pharmacyMedicine.minLevel);
      this.f['reOrderLevel'].setValue(pharmacyMedicine.reOrderLevel);
      this.f['tax'].setValue(pharmacyMedicine.tax);
      this.f['packing'].setValue(pharmacyMedicine.packing);
      this.f['vatAC'].setValue(pharmacyMedicine.vatAC);
      this.f['rackNumber'].setValue(pharmacyMedicine.rackNumber);
      this.f['note'].setValue(pharmacyMedicine.note);
      this.f['image'].setValue(pharmacyMedicine.image);
      this.f['imageName'].setValue(pharmacyMedicine.imageName);
    }
  }

  get f() {
    return this.pharmacyMedicineForm.controls;
  }

  handleMedicineImageInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.f['imageName'].setValue(file.name);
    reader.onload = () => {
      this.f['image'].setValue(reader.result);
    };
  }

  downloadMedicineImage() {
    const downloadLink = document.createElement('a');
    const fileName = this.f['imageName'].value;
    downloadLink.href = this.f['image'].value;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  viewImage() {
    const modalRef = this.modalService.open(ImageViewerModalContent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.data = this.f['image'].value;
    modalRef.componentInstance.name = this.f['imageName'].value;
  }

  onSubmit() {
    this.pharmacyMedicineForm.markAllAsTouched();
    if (this.pharmacyMedicineForm.valid) {
      const pharmacyMedicine: PharmacyMedicine = this.pharmacyMedicineForm.getRawValue();
      if (this.isEdit) {
        pharmacyMedicine.id = this.id!;
        this.data.updatePharmacyMedicine(pharmacyMedicine);
      }
      else {
        this.data.addPharmacyMedicine(pharmacyMedicine);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Pharmacy medicine has been updated successfully!' : 'Pharmacy medicine has been added successfully!', 'Success!');
    }
  }
}
