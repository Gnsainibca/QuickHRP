import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/core.index';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PharmacyService } from '../../shared/services/pharmacy.service';
import { BadStockMedicine } from '../../shared/models/pharmacy';

@Component({
  selector: 'app-bad-stock-form',
  templateUrl: './bad-stock-form.component.html',
  styleUrls: ['./bad-stock-form.component.scss']
})
export class BadStockFormComponent {
  badStockMedicineForm!: UntypedFormGroup;
  @Input() medicineId: number | undefined;
  @Output() onSave = new EventEmitter<boolean>();
  batchesInfo: Array<any> = [];

  constructor(public activeModal: NgbActiveModal, private toaster: ToasterService, private fb: FormBuilder, private datePipe: DatePipe,
    private data: PharmacyService) {
  }

  ngOnInit() {
    this.initializerForm();
    this.batchesInfo = this.data.getBatcheNoByMedicineId(this.medicineId!);
  }

  initializerForm() {
    let date = new Date();
    this.badStockMedicineForm = this.fb.group({
      medicineId: [this.medicineId],
      batchNo: ['', [Validators.required]],
      expiryDate: [null, [Validators.required]],
      outwardDate: [date, [Validators.required]],
      quantity: [null, [Validators.required]],
      note: [null]
    });
  }

  get f() {
    return this.badStockMedicineForm.controls;
  }

  onBatchChange(){
    let selectedBatch = this.f['batchNo'].value;
    let expiryDate = this.batchesInfo.find(x=>x.batchNo == selectedBatch)?.expiryDate;
    this.f['expiryDate'].setValue(expiryDate);
  }

  onSubmit() {
    this.badStockMedicineForm.markAllAsTouched();
    if (this.badStockMedicineForm.valid) {
      const badStockMedicine: BadStockMedicine = this.badStockMedicineForm.getRawValue();
      this.data.addBadStockMedicine(badStockMedicine);
      this.onSave.next(true);
      this.toaster.typeSuccess('Bad stock has been added successfully!', 'Success!');
    }
  }
}
