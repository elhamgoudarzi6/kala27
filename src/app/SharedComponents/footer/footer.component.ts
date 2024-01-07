import { LayoutService } from './../../layout/layout.service';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {  Router } from '@angular/router';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  category: any[] = [];
  displayBasic: boolean;
   @Inject(DOCUMENT) document
  constructor(private service: LayoutService,
    private router: Router,
    public localStorage: LocalStorageService,
              private elementRef:ElementRef,
              private renderer: Renderer2
              ) {}

  addJsToElement(): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "phttps://www.zarinpal.com/webservice/TrustCode";
    this.renderer.appendChild(document.body, script);
    return script;
  }
    ngOnInit(): void {
      this.addJsToElement()
    this.service.getAllCategory().subscribe((response) => {
      if (response['success'] === true) {
        this.category = response['data'];
      }
    });
  }
  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl('/products/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }
}
