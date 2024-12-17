import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FileDownloadComponent} from "./file-download/file-download.component";
import {OffersPageComponent} from "./offers-page/offers-page.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {CandidatesComponent} from "./candidates/candidates.component";
import {AddJobOfferModalComponent} from "./add-job-offer-modal/add-job-offer-modal.component";

const routes: Routes = [
  {
    path: 'addOffer',
    component: AddJobOfferModalComponent },
  {
    path: 'candidates/:jobId',
    component: CandidatesComponent },
  {
    path: 'offer/:id',
    component: OfferDetailsComponent },
  {
    path:'offers',
    component: OffersPageComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component:ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'upload',
    component: FileUploadComponent,
  },
  {
    path: 'download',
    component: FileDownloadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
