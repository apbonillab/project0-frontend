import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { GeneralListService } from './core/services/general-list.service';
import { EventsService } from './core/services/events.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/services/Token_Interceptor';
import { AuthenticatedService } from './core/services/authenticated.service';
import { HistoricalComponent } from './historical/historical.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MenuComponent,
    CreateComponent,
    ErrorComponent,
    HistoricalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [GeneralListService,EventsService,AuthenticatedService,
              {  provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
