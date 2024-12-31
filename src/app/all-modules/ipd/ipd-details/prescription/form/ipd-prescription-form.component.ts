import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord, SimpleRecordWithParent } from 'src/app/shared/models/simple-record';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { IpdPrescribeMedicine, IpdPrescription } from '../../../shared/models/ipd-prescription';
import { PharmacySetupService } from 'src/app/all-modules/setup/pharmacy/shared/services/pharmacy-setup.service';
import { Master_MedicineCategory } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-category';
import { PharmacyService } from 'src/app/all-modules/pharmacy/shared/services/pharmacy.service';
import { Master_MedicineDosage } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-dosage';
import { Master_MedicineDoseInterval } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-dose-interval';
import { Master_MedicineDoseDuration } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-dose-duration';
import { Master_MedicineUnit } from 'src/app/all-modules/setup/pharmacy/shared/models/master-medicine-unit';
import { CommonService } from 'src/app/shared/data/common.service';
import { PathologyDataService } from 'src/app/all-modules/pathology/shared/services/pathology-data.service';
import { RadiologyDataService } from 'src/app/all-modules/radiology/shared/services/radiology-data.service';
import { FindingsSetupService } from 'src/app/all-modules/setup/findings/shared/services/findings-setup.service';
import { Master_FindingsList } from 'src/app/all-modules/setup/findings/shared/models/master-findings';
import { Master_FindingsCategory } from 'src/app/all-modules/setup/findings/shared/models/master-findings-category';

@Component({
  selector: 'app-ipd-prescription-form',
  templateUrl: './ipd-prescription-form.component.html',
  styleUrls: ['./ipd-prescription-form.component.scss']
})
export class IPDPrescriptionFormComponent {

  @Input() isEdit !: boolean;
  @Output() onSave = new EventEmitter<boolean>();

  @Input() id: number = 0;
  @Input() ipdPatientId: number = 0;

  ipdPrescriptionForm!: UntypedFormGroup;

  findingCategories: Array<Master_FindingsCategory> = [];
  findingList: Array<Master_FindingsList> = [];
  findingsByCategory: Array<Master_FindingsCategory> = [];
  dropdownSettings = {};
  userRoles: Array<SimpleRecord> = [];

  medicineCategories: Array<Master_MedicineCategory> = [];
  medicines: Array<SimpleRecordWithParent> = [];
  filteredMedicines: Array<SimpleRecord> = [];
  medicineDosages: Array<Master_MedicineDosage> = [];
  filteredMedicineDosages: Array<Master_MedicineDosage> = [];
  dosageIntervals: Array<Master_MedicineDoseInterval> = [];
  dosageDurations: Array<Master_MedicineDoseDuration> = [];
  units: Array<Master_MedicineUnit> = [];

  doctors: Array<SimpleRecord> = [];

  pathologyTests: Array<SimpleRecord> = [];
  radiologyTests: Array<SimpleRecord> = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService,
    private fb: FormBuilder, private ipdDataService: IpdDataService,
    pharmacySetupService: PharmacySetupService, pharmacyService: PharmacyService, commonService: CommonService,
    pathologyDataService: PathologyDataService, radiologyDataService: RadiologyDataService,
    findingsSetupService: FindingsSetupService) {
    this.findingCategories = findingsSetupService.getFindingsCategoryList();
    this.findingList = findingsSetupService.getFindingsList();
    this.userRoles = commonService.getRoles();
    this.medicineCategories = pharmacySetupService.getMedicineCategoryList();
    this.medicines = pharmacyService.getMedicineNameList();
    this.medicineDosages = pharmacySetupService.getMedicineDosageList();
    this.dosageIntervals = pharmacySetupService.getMedicineDoseIntervalList();
    this.dosageDurations = pharmacySetupService.getMedicineDoseDurationList();
    this.units = pharmacySetupService.getMedicineUnitList();
    this.pathologyTests = pathologyDataService.getPathologyTestNameList();
    this.radiologyTests = radiologyDataService.getRadiologyTestNameList();
  }

  ngOnInit() {
    this.ipdPrescriptionForm = this.fb.group({
      ipdPatientId: [this.ipdPatientId],
      headerNote: [null],
      footerNote: [null],
      findingCategories: [null],
      findings: [null],
      findingDescription: [null],
      printFindings: [false],
      medicineInnerForm: this.fb.array(
        [
          this.fb.group(
            {
              medicineCategoryId: ['', [Validators.required]],
              medicineId: ['', [Validators.required]],
              unitId: [''],
              doseIntervalId: ['', [Validators.required]],
              doseDurationId: ['', [Validators.required]],
              instrunction: [null],
              filteredMedicines: [null],
              filteredMedicineDosages: [null]
            }
          )
        ]
      ),
      prescribeById: ['', [Validators.required]],
      pathologyIds: [''],
      radiologyIds: [''],
      userRoleInnerForm: new FormArray([])
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.setFormControls();
    this.userRoles.forEach(() => this.userRoleInnerForm.push(new FormControl()));
  }

  addMedicine() {
    this.medicineInnerForm.push(this.fb.group({
      medicineCategoryId: ['', [Validators.required]],
      medicineId: ['', [Validators.required]],
      unitId: [''],
      doseIntervalId: ['', [Validators.required]],
      doseDurationId: ['', [Validators.required]],
      instrunction: [null],
      filteredMedicines: [null],
      filteredMedicineDosages: [null]
    }));
  }

  private setFormControls() {
    this.doctors = this.ipdDataService.getIpdPatientList().filter(x => x.id == this.ipdPatientId).map(x => {
      return {
        id: x.consultantDoctorId,
        name: x.consultantDoctor
      }
    });

    if (this.isEdit) {
      let presciption = this.ipdDataService.getPrescriptions().find(x => x.id == this.id)!;
      this.f['ipdPatientId'].setValue(presciption.ipdPatientId);
      this.f['headerNote'].setValue(presciption.headerNote);
      this.f['footerNote'].setValue(presciption.footerNote);
      this.f['findingCategories'].setValue(presciption.findingCategories);
      this.f['findings'].setValue(presciption.findings);
      this.f['findingDescription'].setValue(presciption.findingDescription);
      this.f['printFindings'].setValue(presciption.printFindings);
      this.f['prescribeById'].setValue(presciption.prescribeById);
      this.f['pathologyIds'].setValue(presciption.pathologyIds);
      this.f['radiologyIds'].setValue(presciption.radiologyIds);

      this.deleteMedicine(0);
      presciption.medicineInnerForm.forEach((medicine, index) => {
        this.setMedicine(medicine, index);
      });

      this.userRoles.forEach((userRole, index) => {
        this.userRoleInnerForm.controls[index]?.setValue(presciption.userRoleInnerForm.some(x => x.id === userRole.id));
      });
    }
  }

  setMedicine(medicine: IpdPrescribeMedicine, index: number) {
    this.medicineInnerForm.push(this.fb.group({
      medicineCategoryId: [medicine ? medicine.medicineCategoryId : '', [Validators.required]],
      medicineId: [medicine ? medicine.medicineId : '', [Validators.required]],
      unitId: [medicine ? medicine.unitId : '', [Validators.required]],
      doseIntervalId: [medicine ? medicine.doseIntervalId : '', [Validators.required]],
      doseDurationId: [medicine ? medicine.doseDurationId : '', [Validators.required]],
      instrunction: [medicine ? medicine.instrunction : null],
      filteredMedicines: [null],
      filteredMedicineDosages: [null]
    }));

    this.onMedicineCategoryChange(index);
  }

  public setFindingsItemWise(item: any) {
    let selectedFindingCategories: Array<SimpleRecord> = this.f['findingCategories'].value;
    this.setFindings(selectedFindingCategories);
  }

  public setFindingsWithAllItems(selectedFindingCategories: any) {
    this.setFindings(selectedFindingCategories);
  }

  private setFindings(selectedItems: Array<SimpleRecord>) {
    this.f['findings'].setValue(null);
    this.f['findingDescription'].setValue(null);
    this.findingsByCategory = this.findingList.filter(x => selectedItems?.some(y => y.id === x.categoryId));
  }

  public setFindingDescriptionItemWise(item: any) {
    let selectedFindings: Array<SimpleRecordWithParent> = this.f['findings'].value;
    this.setFindingsDescription(selectedFindings);
  }

  public setFindingDescriptionWithAllItems(selectedFindings: any) {
    this.setFindingsDescription(selectedFindings);
  }

  private setFindingsDescription(selectedItems: Array<SimpleRecordWithParent>) {
    this.f['findingDescription'].setValue(null);
    const findingDescription = this.findingList.filter(x => selectedItems?.some(y => y.id === x.id)).map(x => `${x.name} : \n${x.description}`).join('\n\n');
    this.f['findingDescription'].setValue(findingDescription);
  }

  get f() {
    return this.ipdPrescriptionForm.controls;
  }

  get medicineInnerForm() {
    return this.ipdPrescriptionForm.get('medicineInnerForm') as FormArray;
  }

  get userRoleInnerForm() {
    return this.ipdPrescriptionForm.get('userRoleInnerForm') as FormArray;
  }

  deleteMedicine(index: number) {
    this.medicineInnerForm.removeAt(index);
  }

  public onMedicineCategoryChange(index: number) {
    let medicineCategoryId = this.medicineInnerForm.controls[index].get('medicineCategoryId')?.value;
    this.filteredMedicineDosages = this.medicineDosages.filter(x => x.medicineCategoryId === medicineCategoryId);
    this.filteredMedicines = this.medicines.filter(x => x.parentId === medicineCategoryId);
    this.medicineInnerForm.controls[index].get('filteredMedicines')?.setValue(this.filteredMedicines);
    this.medicineInnerForm.controls[index].get('filteredMedicineDosages')?.setValue(this.filteredMedicineDosages);
  }

  onSubmit() {
    this.ipdPrescriptionForm.markAllAsTouched();
    if (this.ipdPrescriptionForm.valid) {
      const data: IpdPrescription = Object.assign({}, this.ipdPrescriptionForm.getRawValue(), {
        userRoleInnerForm: this.userRoleInnerForm.controls.map((selected, i) => {
          return {
            id: this.userRoles[i].id,
            selected: selected.value
          }
        }).filter(x => x.selected)
      });
      data.date = new Date();
      if (this.isEdit) {
        data.id = this.id;
        this.ipdDataService.updatePrescription(data);
      }
      else {
        this.ipdDataService.addPrescription(data);

      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Prescription details has been updated successfully!' : 'Prescription details has been added successfully!', 'Success!');
    }
  }
}
