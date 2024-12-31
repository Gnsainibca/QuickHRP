import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ImageViewerModalContent } from 'src/app/shared/components/image-view/image-viewer-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APP_CONSTANT } from 'src/app/shared/constants/app-constant';
import { ToasterService } from 'src/app/shared/core.index';
import { SettingService } from '../shared/services/setting.service';

@Component({
  selector: 'app-setup-general-setting',
  templateUrl: './setup-general-setting.component.html',
  styleUrls: ['./setup-general-setting.component.scss']
})
export class SetupGeneralSettingComponent {

  generalSettingForm!: UntypedFormGroup;
  lsKey: string = APP_CONSTANT.localStorage.key.master_generalSettings;
  id: number = 1;
  dateFromats : Array<string> = ['dd MMM, yyyy','dd-MM-yyyy','dd-MMM-yyyy','dd/MM/yyyy','dd.MM.yyyy','MM-dd-yyyy','MM/dd/yyyy','MM.dd.yyyy'];

  constructor(private fb: FormBuilder, private modalService: NgbModal, private settingService: SettingService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    let generalSetting = this.settingService.get(this.id, this.lsKey);
    this.generalSettingForm = this.fb.group({
      hospitalName: [generalSetting ? generalSetting.hospitalName : null, [Validators.required]],
      hospitalCode: [generalSetting ? generalSetting.hospitalCode : null, [Validators.required]],
      phone: [generalSetting ? generalSetting.phone : null, [Validators.required]],
      email: [generalSetting ? generalSetting.email : null, [Validators.required]],
      address: [generalSetting ? generalSetting.address : null, [Validators.required]],
      hospitalLogo: [generalSetting ? generalSetting.hospitalLogo : null, [Validators.required]],
      hospitalSmallLogo: [generalSetting ? generalSetting.hospitalSmallLogo : null, [Validators.required]],
      dateFormat: [generalSetting ? generalSetting.dateFormat : '', [Validators.required]],
    });
  }

  get f() {
    return this.generalSettingForm.controls;
  }

  handleHospitalLogoInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.f['hospitalLogo'].setValue(reader.result);
    };
  }

  viewHospitalLogo() {
    const modalRef = this.modalService.open(ImageViewerModalContent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.data = this.f['hospitalLogo'].value;
    modalRef.componentInstance.name = 'logo.png';
  }

  handleHospitalSmallLogoInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.f['hospitalSmallLogo'].setValue(reader.result);
    };
  }

  viewHospitalSmallLogo() {
    const modalRef = this.modalService.open(ImageViewerModalContent, { backdrop: 'static', size: 'xl', scrollable: true });
    modalRef.componentInstance.data = this.f['hospitalSmallLogo'].value;
    modalRef.componentInstance.name = 'logo.png';
  }

  onSubmit() {
    this.generalSettingForm.markAllAsTouched();
    if (this.generalSettingForm.valid) {
      const generalSetting: any = this.generalSettingForm.getRawValue();
      generalSetting.id = this.id;
      this.settingService.update(generalSetting, this.lsKey);
      this.toaster.typeSuccess('General setting has been updated successfully!', 'Success!');
    }
  }
}
