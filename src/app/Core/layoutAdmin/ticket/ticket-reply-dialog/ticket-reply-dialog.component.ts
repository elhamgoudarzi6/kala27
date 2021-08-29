import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AdminService} from "../../admin.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-ticket-reply-dialog',
  templateUrl: './ticket-reply-dialog.component.html',
  styleUrls: ['./ticket-reply-dialog.component.scss'],
  providers: [MessageService]
})
export class TicketReplyDialogComponent implements OnInit {
  public form: FormGroup;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;
  constructor( private formBuilder: FormBuilder,
               private service: AdminService,
               public ref: DynamicDialogRef,
               public messageService: MessageService,
               public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.createform();
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
  }
  createform(): void {
    this.form = this.formBuilder.group({
      message: new FormControl(this.config.data.reply)
    });
  }

  submitForm(): void {
    let data={
      detail:{
        message:this.form.get('message').value,
        date:this.date,
        time:this.time
      }

    }
    console.log(data)
    this.service.replyTicket(this.config.data.id, data).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
