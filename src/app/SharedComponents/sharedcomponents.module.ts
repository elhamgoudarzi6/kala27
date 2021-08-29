import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedmodulesModule } from '../SharedModules/sharedmodules.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { HeadertwoComponent } from './headertwo/headertwo.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    HeadertwoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedmodulesModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  exports: [HeaderComponent, FooterComponent, HeadertwoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedComponentsModule {}
