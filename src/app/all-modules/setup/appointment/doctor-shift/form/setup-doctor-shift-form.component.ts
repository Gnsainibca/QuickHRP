import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_DoctorShift } from '../../shared/models/master-doctor-shift';
import { Master_Shift } from '../../shared/models/master-shift';
import { CommonService } from 'src/app/shared/data/common.service';
import { SimpleRecord } from 'src/app/shared/models/simple-record';

@Component({
  selector: 'app-setup-doctor-shift-form',
  templateUrl: './setup-doctor-shift-form.component.html',
  styleUrls: ['./setup-doctor-shift-form.component.scss']
})
export class SetupDoctorShiftFormComponent {
  doctorShiftForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  shifts: Array<Master_Shift> = [];
  doctor?: SimpleRecord;

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder,
    private service: AppointmentSetupService, private commonService: CommonService) {
    this.shifts = service.getShifts();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.doctorShiftForm = this.fb.group({
      doctorName: [null, [Validators.required]],
      shiftInnerForm: new FormArray([])
    });
    this.shifts.forEach(() => this.shiftInnerForm.push(new FormControl()));
    this.setFormControls();
  }

  private setFormControls() {
    this.doctor = this.commonService.getDoctorsNameList().find(x => x.id == this.id);
    if (this.isEdit) {
      let doctorShift = this.service.getDoctorShift(this.id) as Master_DoctorShift;
      this.f['doctorName'].setValue(this.doctor?.name);
      this.shifts.forEach((shift, index) => {
        this.shiftInnerForm.controls[index]?.setValue(doctorShift ? doctorShift.shiftInnerForm.some(x => x.id === shift.id) : false);
      });
    }
  }

  get f() {
    return this.doctorShiftForm.controls;
  }

  get shiftInnerForm() {
    return this.doctorShiftForm.get('shiftInnerForm') as FormArray;
  }

  onSubmit() {
    this.doctorShiftForm.markAllAsTouched();
    if (this.doctorShiftForm.valid) {

      const doctorShift: Master_DoctorShift = Object.assign({}, this.doctorShiftForm.getRawValue(), {
        shiftInnerForm: this.shiftInnerForm.controls.map((selected, i) => {
          return {
            id: this.shifts[i].id,
            selected: selected.value
          }
        }).filter(x => x.selected)
      });

      if (this.isEdit) {
        doctorShift.doctorId = this.id!;
        doctorShift.id = this.id!;
        this.service.updateDoctorShift(doctorShift);
      }
      else {
        doctorShift.isActive = true;
        this.service.addDoctorShift(doctorShift);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Doctor shift has been updated successfully!' : 'Doctor shift has been added successfully!', 'Success!');
    }
  }
}
