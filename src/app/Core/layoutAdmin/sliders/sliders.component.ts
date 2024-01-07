import { SliderEditDialogComponent } from './slider-edit-dialog/slider-edit-dialog.component';
import { SliderAddDialogComponent } from './slider-add-dialog/slider-add-dialog.component';
import { LocalStorageService } from './../../../Auth/localStorageLogin/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class SlidersComponent implements OnInit {

  sliders: any[] = [];

  constructor(private service: AdminService,
              private  messageService: MessageService,
              public dialogService: DialogService,
              private localStorage: LocalStorageService,
              private  confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
   // this.localStorage.isNotSupportUser();
    this.getSliders();
  }

  getSliders(): any {
    this.service.getSliders().subscribe((response) => {
      if (response.success === true) {
        this.sliders = response.data;
      }
    });
  }

  showAddSliderDialog(): void {
    const ref = this.dialogService.open(SliderAddDialogComponent, {
      header: 'ثبت اسلایدر جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getSliders();
      }
    });
  }

  showEditSliderDialog(id: any, link: string, tag: string, imageurl: string): void {
    const ref = this.dialogService.open(SliderEditDialogComponent, {
      data: {
        id,
        link,
        tag,
        imageurl
      },
      header: 'ویرایش اسلایدر',
      width: '70%',
      contentStyle: {'direction': 'rtl'}
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getSliders();
      }
    });
  }

  deleteSlider(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSlider(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          } else {
            this.messageService.add({severity: 'error', summary: ' حذف ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

}
