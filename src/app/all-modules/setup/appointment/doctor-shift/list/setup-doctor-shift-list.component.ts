import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { AppointmentSetupService } from '../../shared/services/appointment-setup.service';
import { Master_DoctorShift } from '../../shared/models/master-doctor-shift';
import { Master_Shift } from '../../shared/models/master-shift';
import { CommonService } from 'src/app/shared/data/common.service';
import { SetupDoctorShiftFormComponent } from '../form/setup-doctor-shift-form.component';

@Component({
  selector: 'app-setup-doctor-shift-list',
  templateUrl: './setup-doctor-shift-list.component.html',
  styleUrls: ['./setup-doctor-shift-list.component.scss']
})
export class SetupDoctorShiftListComponent {
  public doctorShifts: Array<Master_DoctorShift> = [];
  shifts: Array<Master_Shift> = [];
  doctors: Array<SimpleRecord> = [];

  constructor(private modalService: NgbModal, private service: AppointmentSetupService, commonService: CommonService
  ) {
    this.shifts = service.getShifts();
    this.doctors = commonService.getDoctorsNameList();
  }

  ngOnInit() {
    this.refereshGrid();
  }

  public refereshGrid() {
    this.getList();
  }

  public edit(id: number) {
    this.openModal_Edit(id);
  }

  private openModal_Edit(id: number) {
    const modalRef = this.modalService.open(SetupDoctorShiftFormComponent, { backdrop: 'static', size: 'lg', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.onSave.subscribe((res: any) => {
      this.refereshGrid();
      modalRef.close();
    });
  }

  checkForDoctorActiveShift(shift: SimpleRecord, innerForm: Array<SimpleRecord>) {
    return innerForm?.length > 0 ? innerForm.some(x => x.id === shift.id) : false;
  }

  private getList(): void {
    this.doctorShifts = [];
    let lsdoctorShifts = this.service.getDoctorShifts().sort((a, b) => a.id - b.id) as Array<Master_DoctorShift>;
    this.doctors.forEach((doctor, index) => {
      let doctorShift = lsdoctorShifts.find(x => x.doctorId == doctor.id);
      if (doctorShift) {
        this.doctorShifts.push(
          {
            id: (index + 1),
            doctorId: doctor.id,
            doctorName: doctor.name,
            shiftInnerForm: doctorShift.shiftInnerForm,
            isActive: true
          });
      }
      else {
        this.doctorShifts.push(
          {
            id: (index + 1),
            doctorId: doctor.id,
            doctorName: doctor.name,
            shiftInnerForm: [],
            isActive: true
          });
      }
    });
  }
}
