import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount-add-dialog',
  templateUrl: './discount-add-dialog.component.html',
  styleUrls: ['./discount-add-dialog.component.scss'],
  providers: [MessageService],
})
export class DiscountAddDialogComponent implements OnInit {

  public form: FormGroup;
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
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      discountTitle: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      discountCode: new FormControl(
        null
      ),
      discountPercent: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    this.service.addDiscount(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}
