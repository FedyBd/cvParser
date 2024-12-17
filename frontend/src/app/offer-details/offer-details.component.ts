import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from "../services/api.service";
import {Emitters} from "../Emitters/emitters"; // If you're using toastr for notifications
import {Offer} from "../models/offer.model";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer: any; // Define your offer type
  offerId!: number;
  candidateId!: number;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService, // Your service to get offer data
    private toastr: ToastrService, // Optional: For notifications
    private router: Router,
    private http:HttpClient
  ) {}
  isRecruiter!:boolean;
  disabled= false;
  isEditing: any;
  async ngOnInit(): Promise<void> {
    const userResponse= await this.apiservice.getUser().toPromise();
    // @ts-ignore
    this.candidateId=userResponse.id;
     Emitters.typeEmitter.subscribe(
      (res)=>{this.isRecruiter=res}
    )
    this.isRecruiter=localStorage.getItem('userType')=='recruiter';
    console.log(this.isRecruiter);
    this.route.paramMap.subscribe(params => {
      this.offerId = +params.get('id')!;
      this.loadOfferDetails();
    });
    this.apiservice.checkCanJob(this.candidateId,this.offerId).subscribe(
      (res:any)=>{
        console.log(res.bool);
        this.disabled=res.bool;
      }
    )
  }
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  loadOfferDetails(): void {
    this.apiservice.getOfferById(this.offerId).subscribe(
      data => {
        this.offer = data
      },
      error => this.toastr.error('Failed to load offer details', 'Error')
    );
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log(`Selected file: ${this.selectedFile.name}`);
      this.apiservice.upload(this.selectedFile,this.offerId,this.candidateId).subscribe(
        response => {
          this.disabled=true;
          console.log('Upload success:', response);
          this.toastr.success('File uploaded successfully', 'Success!');
          setTimeout(() => {
            this.router.navigateByUrl('/offers');
          }, 3000);
        },
        error => {
          console.error('Upload failed:', error);
          this.toastr.error('File upload failed', 'Error');
        }
      );
    } else {
      this.toastr.warning('No file selected', 'Warning');
    }
  }

  getCandidates() {
    this.router.navigate([`/candidates/${this.offerId}`]);
  }

  // Method to enter edit mode
  editOffer() {
    this.isEditing = true;
  }

  // Method to cancel changes and exit edit mode
  cancelChanges() {
    this.isEditing = false;
    // Optionally, you can reload the original offer details from the server if needed
  }

  // Method to confirm changes and exit edit mode
  confirmChanges() {
    // Implement the logic to send the updated offer details to the backend server
    this.updateOffer(this.offer).subscribe(
      response => {
        console.log('Offer updated successfully', response);
        this.isEditing = false; // Exit edit mode
      },
      error => {
        console.error('Error updating offer', error);
        // Handle error appropriately
      }
    );
  }

  // Mock method to send update request to the backend
  updateOffer(offer: Offer) {
    console.log("offer : ",offer);
    // Replace this with an actual HTTP request to update the offer
    return this.http.put(`http://localhost:3000/job-description/${offer.id}`, offer);
  }
}
