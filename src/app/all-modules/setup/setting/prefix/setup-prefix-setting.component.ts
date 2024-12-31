import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { SettingService } from '../shared/services/setting.service';

@Component({
  selector: 'app-setup-prefix-setting',
  templateUrl: './setup-prefix-setting.component.html',
  styleUrls: ['./setup-prefix-setting.component.scss']
})
export class SetupPrefixSettingComponent {

  prefixSettingForm!: UntypedFormGroup;
  id: number = 1;

  constructor(private fb: FormBuilder, private settingService: SettingService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    let prefixSetting = this.settingService.getPrefixById(this.id);
    this.prefixSettingForm = this.fb.group({
      ipdNo: [prefixSetting ? prefixSetting.ipdNo : null, [Validators.required]],
      opdNo: [prefixSetting ? prefixSetting.opdNo : null, [Validators.required]],
      ipdPrescription: [prefixSetting ? prefixSetting.ipdPrescription : null, [Validators.required]],
      opdPrescription: [prefixSetting ? prefixSetting.opdPrescription : null, [Validators.required]],
      appointment: [prefixSetting ? prefixSetting.appointment : null, [Validators.required]],
      pharmacyBill: [prefixSetting ? prefixSetting.pharmacyBill : null, [Validators.required]],
      operationReferenceNo: [prefixSetting ? prefixSetting.operationReferenceNo : null, [Validators.required]],
      radiologyBill: [prefixSetting ? prefixSetting.radiologyBill : null, [Validators.required]],
      pathologyBill: [prefixSetting ? prefixSetting.pathologyBill : null, [Validators.required]],
      opdCheckupId: [prefixSetting ? prefixSetting.opdCheckupId : null, [Validators.required]],
      pharmacyPurchaseNo: [prefixSetting ? prefixSetting.pharmacyPurchaseNo : null, [Validators.required]],
    });
  }

  get f() {
    return this.prefixSettingForm.controls;
  }

  onSubmit() {
    this.prefixSettingForm.markAllAsTouched();
    if (this.prefixSettingForm.valid) {
      const prefixSetting: any = this.prefixSettingForm.getRawValue();
      prefixSetting.id = this.id;
      this.settingService.updatePrefix(prefixSetting);
      this.toaster.typeSuccess('Prefix setting has been updated successfully!', 'Success!');
    }
  }
}
