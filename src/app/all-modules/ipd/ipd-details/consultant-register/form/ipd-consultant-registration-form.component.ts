import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SimpleRecord } from 'src/app/shared/models/simple-record';
import { IpdDataService } from '../../../shared/servives/Ipd.service';
import { ConsultantRegistration } from '../../../shared/models/consultant-register';
import { CommonService } from 'src/app/shared/data/common.service';

@Component({
  selector: 'app-ipd-consultant-registration-form',
  templateUrl: './ipd-consultant-registration-form.component.html',
  styleUrls: ['./ipd-consultant-registration-form.component.scss']
})
export class IPDConsultantRegistrationFormComponent {
  consultantForm!: UntypedFormGroup;
  doctors : Array<SimpleRecord> = [];
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() ipdPatientId : number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private serivce: IpdDataService, 
    private commonService : CommonService) {
    }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.consultantForm = this.fb.group({
      ipdPatientId: [this.ipdPatientId, [Validators.required]],
      appliedDate: [null, [Validators.required]],
      consultantDate: [null, [Validators.required]],
      doctorId: ['', [Validators.required]],
      instruction: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let consultant = this.serivce.getConsultantRegistrations().find(x => x.id == this.id)!;
      this.f['ipdPatientId'].setValue(consultant.ipdPatientId);
      this.f['appliedDate'].setValue(consultant.appliedDate);
      this.f['consultantDate'].setValue(consultant.consultantDate);
      this.f['doctorId'].setValue(consultant.doctorId);
      this.f['instruction'].setValue(consultant.instruction);
    }
  }

  private setFormData() {
    this.doctors = this.commonService.getDoctorsNameList();
  }

  get f() {
    return this.consultantForm.controls;
  }

  onSubmit() {
    this.consultantForm.markAllAsTouched();
    if (this.consultantForm.valid) {
      const consultantRegistration: ConsultantRegistration = this.consultantForm.getRawValue();
      if (this.isEdit) {
        consultantRegistration.id = this.id!;
        this.serivce.updateConsultantRegistration(consultantRegistration);
      }
      else {
        this.serivce.addConsultantRegistration(consultantRegistration);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Consultant details has been updated successfully!' : 'Consultant details has been added successfully!', 'Success!');
    }
  }
}
