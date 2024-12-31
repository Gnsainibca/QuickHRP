import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Appointment, AppointmentList } from '../models/appointment';
import { DataService } from 'src/app/shared/core.index';
import { CommonService } from 'src/app/shared/data/common.service';
import { BaseService } from 'src/app/shared/data/base.service';
import { AppointmentSetupService } from 'src/app/all-modules/setup/appointment/shared/services/appointment-setup.service';
import { Prefix_Screen } from 'src/app/shared/enums/prefix-screen';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { SettingService } from 'src/app/all-modules/setup/setting/shared/services/setting.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentDataService extends BaseService {

  constructor(http: HttpClient, private commonService : CommonService, private dataService : DataService, 
    private appointmentSetupService : AppointmentSetupService, private hospitalChargeSetupService : HospitalChargeSetupService,
    private settingService : SettingService) {
    super(http);
  }

  public getAppointments(): Array<AppointmentList> {
    let result: Array<AppointmentList> = [];
    let shifts = this.appointmentSetupService.getShifts();
    let priorityList = this.appointmentSetupService.getAppointmentPriorityList();
    let sourceList = this.appointmentSetupService.getAppointmentSourceList();
    let statusList = this.appointmentSetupService.getAppointmentStatusList();
    let paymentModes = this.hospitalChargeSetupService.getPaymentModeList();
    let genderList = this.settingService.getGenderList();
    this.list(APP_CONSTANT.localStorage.key.appointments).forEach(appointment => {
      let patient = this.commonService.getPatientById(appointment.patientId);
      result.push(
        { 
          ...appointment,  
          patientName : patient?.name,
          phone : patient?.phone,
          doctor: this.commonService.getDoctorById(appointment.doctorId)?.fullNameWithId,
          shift: shifts.find(x => x.id == appointment.shiftId)?.name,
          slot: this.dataService.slots.find(x => x.id == appointment.slotId)?.name,
          paymentMode: paymentModes.find(x => x.id == appointment.paymentModeId)?.name,
          priority: priorityList.find(x => x.id == appointment.priorityId)?.name,
          status: statusList.find(x => x.id == appointment.statusId)?.name,
          source: sourceList.find(x => x.id == appointment.sourceId)?.name,
          gender: genderList.find(x=> x.id == patient?.genderId)?.name,
        }
      )
    });
    return result;
  }

  public getAppointmentById(id: number): AppointmentList {
    return this.getAppointments().find(x => x.id == id) as AppointmentList
  }

  public addAppointment(appointment: Appointment) {
    let dbAppointment : Appointment = this.add(appointment, APP_CONSTANT.localStorage.key.appointments);
    dbAppointment.appointmentNo = this.commonService.getNo(dbAppointment.id, Prefix_Screen.Appointment);
    this.updateAppointment(dbAppointment);
  }

  public updateAppointment(appointment: Appointment) {
    this.update(appointment, APP_CONSTANT.localStorage.key.appointments);
  }

  public deleteAppointment(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.appointments);
  }
}