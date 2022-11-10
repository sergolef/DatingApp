import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from  'ng-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    GalleryModule.withConfig({}),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FileUploadModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    CollapseModule,
    TabsModule,
    GalleryModule,
    NgxSpinnerModule,
    FileUploadModule
  ]
})
export class SharedModule { }
