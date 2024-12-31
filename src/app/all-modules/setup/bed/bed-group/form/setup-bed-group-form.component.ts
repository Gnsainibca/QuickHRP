import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BedSetupService } from '../../shared/services/bed-setup.service';
import { Master_Floor } from '../../shared/models/master-floor';
import { Master_BedGroup } from '../../shared/models/master-bed-group';

@Component({
  selector: 'app-setup-bed-group-form',
  templateUrl: './setup-bed-group-form.component.html',
  styleUrls: ['./setup-bed-group-form.component.scss']
})
export class SetupBedGroupFormComponent {
  bedGroupForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  floorList: Array<Master_Floor> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: BedSetupService) {
    this.floorList = service.getFloorList() as Array<Master_Floor>;
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.bedGroupForm = this.fb.group({
      name: [null, [Validators.required]],
      floorId: ['', [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let bedGroup = this.service.getBedGroup(this.id) as Master_BedGroup;
      this.f['name'].setValue(bedGroup.name);
      this.f['floorId'].setValue(bedGroup.floorId);
      this.f['description'].setValue(bedGroup.description);
    }
  }

  get f() {
    return this.bedGroupForm.controls;
  }

  onSubmit() {
    this.bedGroupForm.markAllAsTouched();
    if (this.bedGroupForm.valid) {
      const bedGroup: Master_BedGroup = this.bedGroupForm.getRawValue();
      if (this.isEdit) {
        bedGroup.id = this.id!;
        this.service.updateBedGroup(bedGroup);
      }
      else {
        bedGroup.isActive = true;
        this.service.addBedGroup(bedGroup);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Bed group has been updated successfully!' : 'Bed group has been added successfully!', 'Success!');
    }
  }
}
