import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import {FileService} from "./services/file.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToolbarModule } from 'primeng/toolbar';
import {MenubarModule} from "primeng/menubar";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {MessagesModule} from "primeng/messages";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { OffersPageComponent } from './offers-page/offers-page.component';
import {DropdownModule} from "primeng/dropdown";
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddJobOfferModalComponent } from './add-job-offer-modal/add-job-offer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    FileUploadComponent,
    FileDownloadComponent,
    OffersPageComponent,
    OfferDetailsComponent,
    CandidatesComponent,
    AddJobOfferModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToolbarModule,
        MenubarModule,
        ButtonDirective,
        InputTextModule,
        PasswordModule,
        MessagesModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        DropdownModule
    ],
  providers: [
    FileService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
