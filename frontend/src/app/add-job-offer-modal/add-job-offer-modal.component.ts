import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-add-job-offer-modal',
  templateUrl: './add-job-offer-modal.component.html',
  styleUrl: './add-job-offer-modal.component.css'
})
export class AddJobOfferModalComponent implements OnInit{

  jobOffer = {
    ownerId:null,
    jobTitle: '',
    jobDescription: '',
    requiredSkills: '',
    experienceRequiredInYears: null
  };

  constructor(private apiservice: ApiService, private router: Router,private toastr: ToastrService ) {}

  async ngOnInit() {
    // Fetch user ID and assign it to jobOffer.ownerId
    try {
      const response: any = await firstValueFrom(this.apiservice.getUser());
      console.log(`response1 : ${response.id}`);
      this.jobOffer.ownerId = response.id; // Assign the user ID to ownerId
    } catch (error) {
      console.error('Error fetching user ID:', error);
      this.toastr.error('Failed to fetch user ID.');
    }
  }


  async onSubmit() {
    // Call the service to add the job offer
    this.apiservice.addJobOffer(this.jobOffer).subscribe(() => {
      this.toastr.success('Job offer added successfully!'); // Replace alert with Toastr
      this.router.navigate(['/offers']); // Navigate back to job offers page
    }, (error) => {
      console.error('Error adding job offer:', error);
      this.toastr.error('Failed to add job offer. Please try again.'); // Use Toastr for error notification
    });
  }

  cancel() {
    this.router.navigate(['/offers']); // Navigate back to job offers page
  }
}
