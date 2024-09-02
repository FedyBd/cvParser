// offers-page.component.ts
import {Component, OnInit} from '@angular/core';
import { Offer } from '../models/offer.model';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NavbarService} from "../header/header.service";
import {Emitters} from "../Emitters/emitters";

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit{
  userType:any;
  offers: Offer[] = [];
  filteredOffers: any[] = [];
  searchTerm: string = '';
  loginMessage='';
  constructor(private router: Router, private http : HttpClient,private navbarService: NavbarService) {
    this.userType = localStorage.getItem('userType');
  }
  ngOnInit() {
    this.navbarService.triggerReload();
    try {
      if(this.userType=='recruiter'){
        Emitters.typeEmitter.emit(true);
        this.loginMessage='';
        console.log(this.userType);
        this.http.get(`http://localhost:3000/job-description/recruiter`,{withCredentials:true}).subscribe(
          (res:any)=>{
            this.loginMessage='';
            this.offers=res;
            this.filteredOffers = this.offers;
          },()=>{this.loginMessage='Please log in to visualize job offers'}
        )
      }
      else if(this.userType=='candidate'){
        Emitters.typeEmitter.emit(false);
        console.log(this.userType);
        this.http.get('http://localhost:3000/job-description',{withCredentials:true}).subscribe(
          (res:any)=>{
            this.loginMessage='';
            this.offers=res;
            this.filteredOffers = this.offers;
          },()=>{this.loginMessage='Please log in to visualize job offers'}
        )
      }
    }catch(e){
      this.loginMessage='Please log in to visualize job offers'
    }
  }
  filterOffers() {
    if (this.searchTerm.trim() === '') {
      this.filteredOffers = this.offers;
    } else {
      this.filteredOffers = this.offers.filter(offer =>
        offer.jobTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  goToOfferDetails(offerId: number) {
    this.router.navigate(['/offer', offerId]); // Assuming 'offers-details' component is at '/offers/:id'
  }

  addJobOffer() {
    this.router.navigateByUrl('/addOffer')
  }
}
