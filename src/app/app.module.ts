import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimeFrameComponent } from './time-frame/time-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimeFrameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
