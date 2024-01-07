import { AdminService } from './../../admin.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-change-username-dialog',
  templateUrl: './admin-change-username-dialog.component.html',
  styleUrls: ['./admin-change-username-dialog.component.scss'],
  providers: [MessageService]
})
export class AdminChangeUsernameDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    username: [{ type: 'required', message: 'نام کاربری ادمین را وارد کنید.' }]
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
    this.form = this.formBuilder.group(
      {
        username: new FormControl(null, [Validators.required])
      }
    );
  }

  submitForm(): void {

    this.service.changeUsername(this.config.data.id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
