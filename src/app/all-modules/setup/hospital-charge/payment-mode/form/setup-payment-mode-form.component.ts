import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_PaymentMode } from '../../shared/models/master_payment-mode';
import { HospitalChargeSetupService } from '../../shared/services/hospital-charge-setup.service';

@Component({
  selector: 'app-setup-payment-mode-form',
  templateUrl: './setup-payment-mode-form.component.html',
  styleUrls: ['./setup-payment-mode-form.component.scss']
})
export class SetupPaymentModeFormComponent {
  paymentModeForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: HospitalChargeSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.paymentModeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let paymentMode = this.service.getPaymentMode(this.id) as Master_PaymentMode;
      this.f['name'].setValue(paymentMode.name);
    }
  }

  get f() {
    return this.paymentModeForm.controls;
  }

  onSubmit() {
    this.paymentModeForm.markAllAsTouched();
    if (this.paymentModeForm.valid) {
      const paymentMode: Master_PaymentMode = this.paymentModeForm.getRawValue();
      if (this.isEdit) {
        paymentMode.id = this.id!;
        this.service.updatePaymentMode(paymentMode);
      }
      else {
        paymentMode.isActive = true;
        this.service.addPaymentMode(paymentMode);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Payment mode has been updated successfully!' : 'Payment mode has been added successfully!', 'Success!');
    }
  }
}
