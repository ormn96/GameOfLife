import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import {HttpClientModule} from "@angular/common/http";
import { ToaseterContainerComponent } from './toaster/toaseter-container/toaseter-container.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { TemplatesComponent } from './templates/templates.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ToaseterContainerComponent,
    ButtonBarComponent,
    TemplatesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
