import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../../../layoutAdmin/admin.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import * as moment from "jalali-moment";
import {LocalStorageService} from "../../../../Auth/localStorageLogin/local-storage.service";
import {UserService} from "../../User.service";

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss']
})
export class TicketAddComponent implements OnInit {
  public form: FormGroup;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;
  flag: boolean = false;
  UserID: string;

  constructor(private formBuilder: FormBuilder,
              private service: UserService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig,
              private localstotage: LocalStorageService) {
  }

  ngOnInit(): void {
    console.log(this.config.data.id)
    if (this.config.data.id != 0) {
      this.flag = true;
    }
    this.localstotage.getCurrentUser();
    this.UserID = this.localstotage.userJson['id'] || this.localstotage.userJson['_id']
    this.createform();
    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
  }

  createform(): void {
    this.form = this.formBuilder.group({
      message: new FormControl(),
      title: new FormControl(),
    });
  }

  submitForm(): void {
    let data = {
      userID: this.UserID,
      title: this.form.get('title').value,
      detail: {
        message: this.form.get('message').value,
        date: this.date,
        time: this.time
      }
    }
    if (this.config.data.id != 0) {
      console.log(data)
      this.service.replyTicket(this.config.data.id, data).subscribe((response) => {
        console.log(response)
        if (response.success === true) {
          this.ref.close(true);
        }
      })
    } else {
      this.service.registerTicket(data).subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
        }
      });

    }
  }
}
