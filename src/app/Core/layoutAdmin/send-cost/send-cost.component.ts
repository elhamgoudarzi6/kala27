import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../admin.service";


@Component({
  selector: 'app-send-cost',
  templateUrl: './send-cost.component.html',
  styleUrls: ['./send-cost.component.scss'],
  providers: [MessageService]
})
export class SendCostComponent implements OnInit {
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: AdminService,
              public messageService: MessageService,
             ) { }

  ngOnInit(): void {
    this.createform();
  }
  createform(): void {
    this.form = this.formBuilder.group({
      cost: new FormControl()
    });
  }

  submitForm(): void {
    let data={
      cost:this.form.controls['cost'].value
    }
    this.service.registerCost( data).subscribe((response) => {
      if (response.success === true) {
        console.log(response)
        this.messageService.add({severity: 'success', summary: ' هزینه حمل و نقل با موفقیت ثبت شد ', detail: response.data});
      }
    });
  }
}
