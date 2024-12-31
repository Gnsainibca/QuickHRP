import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService, ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from '../../shared/models/appointment';
import { AppointmentDataService } from '../../shared/services/appointment-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { PatientFormComponent } from 'src/app/shared/components/patient-form/patient-form.component';
import { CommonService } from 'src/app/shared/data/common.service';
import { AppointmentSetupService } from 'src/app/all-modules/setup/appointment/shared/services/appointment-setup.service';
import { Master_Shift } from 'src/app/all-modules/setup/appointment/shared/models/master-shift';
import { Master_AppointmentPriority } from 'src/app/all-modules/setup/appointment/shared/models/master-appointment-priority';
import { Master_AppointmentSource } from 'src/app/all-modules/setup/appointment/shared/models/master-appointment-source';
import { Master_AppointmentStatus } from 'src/app/all-modules/setup/appointment/shared/models/master-appointment-status';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  appointmentForm!: UntypedFormGroup;
  doctors: Array<SimpleRecord> = [];
  patients: Array<SimpleRecord> = [];
  shifts: Array<Master_Shift> = [];
  slots: Array<SimpleRecord> = [];
  statusList: Array<Master_AppointmentStatus> = [];
  priorityList: Array<Master_AppointmentPriority> = [];
  paymentModes: Array<Master_PaymentMode> = [];
  sourceList : Array<Master_AppointmentSource> = [];

  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private toaster: ToasterService,
    private fb: FormBuilder, private datePipe: DatePipe, private data: AppointmentDataService, dataService: DataService, 
    private commonService : CommonService, appointmentSetupService : AppointmentSetupService, 
    hospitalChargeSetupService : HospitalChargeSetupService) {
    this.doctors = this.commonService.getDoctorsNameList();
    this.shifts = appointmentSetupService.getShifts();
    this.slots = dataService.slots;
    this.statusList = appointmentSetupService.getAppointmentStatusList();
    this.priorityList = appointmentSetupService.getAppointmentPriorityList();
    this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    this.sourceList = appointmentSetupService.getAppointmentSourceList();
    this.patients = this.commonService.getPatientNameList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    var date = new Date();
    this.appointmentForm = this.fb.group({
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      fees: [null, [Validators.required]],
      shiftId: ['', [Validators.required]],
      appointmentDate: [this.datePipe.transform(date, "dd-MMM-yyyy")],
      slotId: ['', [Validators.required]],
      priorityId: ['', [Validators.required]],
      paymentModeId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      discount: [null, [Validators.required]],
      sourceId: ['', [Validators.required]],
      liveConsultant: [false],
      message: [null],
      alternateAddress: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let appointment = this.data.getAppointmentById(this.id);
      this.f['patientId'].setValue(appointment.patientId);
      this.f['doctorId'].setValue(appointment.doctorId);
      this.f['fees'].setValue(appointment.fees);
      this.f['shiftId'].setValue(appointment.shiftId);
      this.f['appointmentDate'].setValue(appointment.appointmentDate);
      this.f['slotId'].setValue(appointment.slotId);
      this.f['priorityId'].setValue(appointment.priorityId);
      this.f['paymentModeId'].setValue(appointment.paymentModeId);
      this.f['statusId'].setValue(appointment.statusId);
      this.f['discount'].setValue(appointment.discount);
      this.f['sourceId'].setValue(appointment.sourceId);
      this.f['liveConsultant'].setValue(appointment.liveConsultant);
      this.f['message'].setValue(appointment.message);
      this.f['alternateAddress'].setValue(appointment.alternateAddress);
    }
  }
  
  addPatient() {
    const modalRef = this.modalService.open(PatientFormComponent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.onSave.subscribe((patientId: number) => {
      this.patients = this.commonService.getPatientNameList();
      this.f['patientId'].setValue(patientId);
      modalRef.close();
    });
  }

  get f() {
    return this.appointmentForm.controls;
  }

  onSubmit() {
    this.appointmentForm.markAllAsTouched();
    if (this.appointmentForm.valid) {
      const appointment: Appointment = this.appointmentForm.getRawValue();
      if (this.isEdit) {
        appointment.id = this.id!;
        appointment.appointmentNo = appointment.appointmentNo!;
        this.data.updateAppointment(appointment);
      }
      else {
        this.data.addAppointment(appointment);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Appointment has been updated successfully!' : 'Appointment has been added successfully!', 'Success!');
    }
  }
}
