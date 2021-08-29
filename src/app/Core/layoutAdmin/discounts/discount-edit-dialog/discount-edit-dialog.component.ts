import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount-edit-dialog',
  templateUrl: './discount-edit-dialog.component.html',
  styleUrls: ['./discount-edit-dialog.component.scss']
})
export class DiscountEditDialogComponent implements OnInit {

  public form: FormGroup;
  discount: any;
  errorMessages = {
    discountTitle: [{ type: 'required', message: 'عنوان تخفیف را وارد کنید.' }],
    discountPercent: [{ type: 'required', message: 'درصد تخفیف را وارد کنید.' }]
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.discount = this.config.data.discount;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      discountTitle: new FormControl(
        this.discount.discountTitle,
        [
          Validators.required
        ]
      ),
      discountCode: new FormControl(
        this.discount.discountCode
      ),
      discountPercent: new FormControl(
        this.discount.discountPercent,
        [
          Validators.required
        ]
      )
    });
  }


  submitForm(): void {
    this.service.editDiscount(this.discount._id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
