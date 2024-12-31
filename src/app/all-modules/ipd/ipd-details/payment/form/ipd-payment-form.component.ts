import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpdDataService } from 'src/app/all-modules/opd/shared/services/opd.service';
import { Payment } from 'src/app/all-modules/opd/shared/models/payment';
import { HospitalChargeSetupService } from 'src/app/all-modules/setup/hospital-charge/shared/services/hospital-charge-setup.service';
import { Master_PaymentMode } from 'src/app/all-modules/setup/hospital-charge/shared/models/master_payment-mode';

@Component({
  selector: 'app-ipd-payment-form',
  templateUrl: './ipd-payment-form.component.html',
  styleUrls: ['./ipd-payment-form.component.scss']
})
export class IPDPaymentFormComponent {
  paymentForm!: UntypedFormGroup;
  paymentModes: Array<Master_PaymentMode> = [];
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Input() opdPatientId: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private data: OpdDataService,
    hospitalChargeSetupService : HospitalChargeSetupService) {
      this.paymentModes = hospitalChargeSetupService.getPaymentModeList();
    }

  ngOnInit() {
    this.setFormData();
    this.initializerForm();
  }

  initializerForm() {
    this.paymentForm = this.fb.group({
      opdPatientId: [this.opdPatientId, [Validators.required]],
      date: [null, [Validators.required]],
      paymentModeId: ['', [Validators.required]],
      amount: [null, [Validators.required]],
      note: [null]
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let payment = this.data.getPaymentById(this.id);
      this.f['date'].setValue(payment.date);
      this.f['paymentModeId'].setValue(payment.paymentModeId);
      this.f['amount'].setValue(payment.amount);
      this.f['note'].setValue(payment.note);
    }
  }

  private setFormData() {
  }

  get f() {
    return this.paymentForm.controls;
  }

  onSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const payment: Payment = this.paymentForm.getRawValue();
      if (this.isEdit) {
        payment.id = this.id!;
        this.data.updatePayment(payment);
      }
      else {
        this.data.addPayment(payment);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Payment details has been updated successfully!' : 'Payment details has been added successfully!', 'Success!');
    }
  }
}
