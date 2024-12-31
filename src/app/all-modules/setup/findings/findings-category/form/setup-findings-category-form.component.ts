import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_FindingsCategory } from '../../shared/models/master-findings-category';
import { FindingsSetupService } from '../../shared/services/findings-setup.service';

@Component({
  selector: 'app-setup-findings-category-form',
  templateUrl: './setup-findings-category-form.component.html',
  styleUrls: ['./setup-findings-category-form.component.scss']
})
export class SetupFindingsCategoryFormComponent {
  findingsCategoryForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: FindingsSetupService) {
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.findingsCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let findingsCategory = this.service.getFindingsCategory(this.id) as Master_FindingsCategory;
      this.f['name'].setValue(findingsCategory.name);
    }
  }

  get f() {
    return this.findingsCategoryForm.controls;
  }

  onSubmit() {
    this.findingsCategoryForm.markAllAsTouched();
    if (this.findingsCategoryForm.valid) {
      const findingsCategory: Master_FindingsCategory = this.findingsCategoryForm.getRawValue();
      if (this.isEdit) {
        findingsCategory.id = this.id!;
        this.service.updateFindingsCategory(findingsCategory);
      }
      else {
        findingsCategory.isActive = true;
        this.service.addFindingsCategory(findingsCategory);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Findings category has been updated successfully!' : 'Findings category has been added successfully!', 'Success!');
    }
  }
}
