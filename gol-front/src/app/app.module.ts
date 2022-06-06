import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import {HttpClientModule} from "@angular/common/http";
import { ToaseterContainerComponent } from './toaster/toaseter-container/toaseter-container.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { TemplatesComponent } from './templates/templates.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FilterRegexPipe } from './pipes/filter-regex.pipe';
import { SizeSelectorComponent } from './size-selector/size-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ToaseterContainerComponent,
    ButtonBarComponent,
    TemplatesComponent,
    FilterRegexPipe,
    SizeSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
