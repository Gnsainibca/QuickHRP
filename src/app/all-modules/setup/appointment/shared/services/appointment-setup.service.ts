import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/data/base.service';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { Master_DoctorShift } from '../models/master-doctor-shift';
import { Master_Shift } from '../models/master-shift';
import { Master_AppointmentPriority } from '../models/master-appointment-priority';
import { Master_AppointmentSource } from '../models/master-appointment-source';
import { Master_AppointmentStatus } from '../models/master-appointment-status';

@Injectable({
  providedIn: 'root',
})
export class AppointmentSetupService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // ********************************** Charge DoctorShift **************************************//

  public getDoctorShifts(): Array<Master_DoctorShift> {
    return this.list(APP_CONSTANT.localStorage.key.master_doctorShifts) as Array<Master_DoctorShift>;
  }

  public getDoctorShift(id: number): Master_DoctorShift {
    return this.get(id, APP_CONSTANT.localStorage.key.master_doctorShifts) as Master_DoctorShift;
  }

  public addDoctorShift(doctorShift: Master_DoctorShift) {
    this.add(doctorShift, APP_CONSTANT.localStorage.key.master_doctorShifts);
  }

  public updateDoctorShift(doctorShift: Master_DoctorShift) {
    let lsDoctorShift = this.getDoctorShift(doctorShift.id);
    if (lsDoctorShift) {
      this.update(doctorShift, APP_CONSTANT.localStorage.key.master_doctorShifts);
    } else {
      this.addDoctorShift(doctorShift);
    }
  }

  public deleteDoctorShift(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_doctorShifts);
  }

  // ********************************** Shift **************************************//

  public getShifts(): Array<Master_Shift> {
    return this.list(APP_CONSTANT.localStorage.key.master_shifts) as Array<Master_Shift>;
  }

  public getShift(id: number): Master_Shift {
    return this.get(id, APP_CONSTANT.localStorage.key.master_shifts) as Master_Shift;
  }

  public addShift(shift: Master_Shift) {
    this.add(shift, APP_CONSTANT.localStorage.key.master_shifts);
  }

  public updateShift(shift: Master_Shift) {
    this.update(shift, APP_CONSTANT.localStorage.key.master_shifts);
  }

  public deleteShift(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_shifts);
  }

  // ********************************** Appointment Priority**************************************//

  public getAppointmentPriorityList(): Array<Master_AppointmentPriority> {
    return this.list(APP_CONSTANT.localStorage.key.master_appointmentPriorities) as Array<Master_AppointmentPriority>;
  }

  public getAppointmentPriority(id: number): Master_AppointmentPriority {
    return this.get(id, APP_CONSTANT.localStorage.key.master_appointmentPriorities) as Master_AppointmentPriority;
  }

  public addAppointmentPriority(appointmentPriority: Master_AppointmentPriority) {
    this.add(appointmentPriority, APP_CONSTANT.localStorage.key.master_appointmentPriorities);
  }

  public updateAppointmentPriority(appointmentPriority: Master_AppointmentPriority) {
    this.update(appointmentPriority, APP_CONSTANT.localStorage.key.master_appointmentPriorities);
  }

  public deleteAppointmentPriority(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_appointmentPriorities);
  }

  // ********************************** Appointment Source**************************************//

  public getAppointmentSourceList(): Array<Master_AppointmentSource> {
    return this.list(APP_CONSTANT.localStorage.key.master_appointmentSources) as Array<Master_AppointmentSource>;
  }

  public getAppointmentSource(id: number): Master_AppointmentSource {
    return this.get(id, APP_CONSTANT.localStorage.key.master_appointmentSources) as Master_AppointmentSource;
  }

  public addAppointmentSource(appointmentSource: Master_AppointmentSource) {
    this.add(appointmentSource, APP_CONSTANT.localStorage.key.master_appointmentSources);
  }

  public updateAppointmentSource(appointmentSource: Master_AppointmentSource) {
    this.update(appointmentSource, APP_CONSTANT.localStorage.key.master_appointmentSources);
  }

  public deleteAppointmentSource(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_appointmentSources);
  }

  // ********************************** Appointment Status**************************************//

  public getAppointmentStatusList(): Array<Master_AppointmentStatus> {
    return this.list(APP_CONSTANT.localStorage.key.master_appointmentStatuses) as Array<Master_AppointmentStatus>;
  }

  public getAppointmentStatus(id: number): Master_AppointmentStatus {
    return this.get(id, APP_CONSTANT.localStorage.key.master_appointmentStatuses) as Master_AppointmentStatus;
  }

  public addAppointmentStatus(appointmentStatus: Master_AppointmentStatus) {
    this.add(appointmentStatus, APP_CONSTANT.localStorage.key.master_appointmentStatuses);
  }

  public updateAppointmentStatus(appointmentStatus: Master_AppointmentStatus) {
    this.update(appointmentStatus, APP_CONSTANT.localStorage.key.master_appointmentStatuses);
  }

  public deleteAppointmentStatus(id: number) {
    this.delete(id, APP_CONSTANT.localStorage.key.master_appointmentStatuses);
  }
}