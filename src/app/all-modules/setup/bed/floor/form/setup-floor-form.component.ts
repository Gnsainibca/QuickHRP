import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BedSetupService } from '../../shared/services/bed-setup.service';
import { Master_Floor } from '../../shared/models/master-floor';

@Component({
  selector: 'app-setup-floor-form',
  templateUrl: './setup-floor-form.component.html',
  styleUrls: ['./setup-floor-form.component.scss']
})
export class SetupFloorFormComponent {
  floorForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: BedSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.floorForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let floor = this.service.getFloor(this.id) as Master_Floor;
      this.f['name'].setValue(floor.name);
      this.f['description'].setValue(floor.description);
    }
  }

  get f() {
    return this.floorForm.controls;
  }

  onSubmit() {
    this.floorForm.markAllAsTouched();
    if (this.floorForm.valid) {
      const floor: Master_Floor = this.floorForm.getRawValue();
      if (this.isEdit) {
        floor.id = this.id!;
        this.service.updateFloor(floor);
      }
      else {
        floor.isActive = true;
        this.service.addFloor(floor);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Floor has been updated successfully!' : 'Floor has been added successfully!', 'Success!');
    }
  }
}
