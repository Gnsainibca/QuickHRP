import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Master_FindingsCategory } from '../../shared/models/master-findings-category';
import { FindingsSetupService } from '../../shared/services/findings-setup.service';
import { Master_Findings } from '../../shared/models/master-findings';

@Component({
  selector: 'app-setup-findings-form',
  templateUrl: './setup-findings-form.component.html',
  styleUrls: ['./setup-findings-form.component.scss']
})
export class SetupFindingsFormComponent {
  findingsForm!: UntypedFormGroup;
  @Input() isEdit !: boolean;
  @Input() id: number = 0;
  @Output() onSave = new EventEmitter<boolean>();
  findingsCategories: Array<Master_FindingsCategory> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private service: FindingsSetupService) {
    this.findingsCategories = service.getFindingsCategoryList();
  }

  ngOnInit() {
    this.initializerForm();
  }

  initializerForm() {
    this.findingsForm = this.fb.group({
      name: [null, [Validators.required]],
      categoryId: ['', [Validators.required]],
      description: [null],
    });
    this.setFormControls();
  }

  private setFormControls() {
    if (this.isEdit) {
      let findings = this.service.getFinding(this.id) as Master_Findings;
      this.f['name'].setValue(findings.name);
      this.f['categoryId'].setValue(findings.categoryId);
      this.f['description'].setValue(findings.description);
    }
  }

  get f() {
    return this.findingsForm.controls;
  }

  onSubmit() {
    this.findingsForm.markAllAsTouched();
    if (this.findingsForm.valid) {
      const findings: Master_Findings = this.findingsForm.getRawValue();
      if (this.isEdit) {
        findings.id = this.id!;
        this.service.updateFindings(findings);
      }
      else {
        findings.isActive = true;
        this.service.addFindings(findings);
      }
      this.onSave.next(true);
      this.toaster.typeSuccess(this.isEdit ? 'Findings has been updated successfully!' : 'Findings has been added successfully!', 'Success!');
    }
  }
}
