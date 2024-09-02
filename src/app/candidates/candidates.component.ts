import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent implements OnInit{
  jobId!: number;
  jobName!: string;
  candidates!:any[];
  searchTerm:string='';
  filterType: string = 'overall'; // Default filter type

  constructor(private route: ActivatedRoute,private apiservice: ApiService,private location: Location) {}

  ngOnInit() {
  this.route.params.subscribe((params) => {
    this.jobId = params['jobId']; })
    console.log('Job ID:', this.jobId);
  this.apiservice.getOfferById(this.jobId).subscribe(
    (res:any)=>{
      this.jobName=res.jobTitle;
    }
  );
    this.apiservice.getCandidates(this.jobId).subscribe(
      (res:any)=>{
        this.candidates=res;
      },(err:any) =>{
        console.log(err);
      }
    )
}
  goBack() {
    this.location.back(); // Navigates back to the previous page
  }
  onDownload(id: number) {
    this.apiservice.download(id).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf'; // Replace with appropriate filename
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  filteredCandidates() {
    return this.candidates
      .filter((candidate) => {
        const nameMatch = candidate.originalName.toLowerCase().includes(this.searchTerm.toLowerCase());

        // Check the filter type and rate conditions
        if (this.filterType === 'overall') {
          return nameMatch && candidate.Rate >= 0; // Modify this condition as needed
        } else if (this.filterType === 'skills') {
          return nameMatch && candidate.SkillsRate >= 0; // Modify this condition as needed
        } else if (this.filterType === 'experience') {
          return nameMatch && candidate.ExpRate >= 0; // Modify this condition as needed
        }
        return false;
      })
      .sort((a, b) => {
        // Sort based on the selected filter type
        if (this.filterType === 'overall') {
          return b.Rate - a.Rate;
        } else if (this.filterType === 'skills') {
          return b.SkillsRate - a.SkillsRate;
        } else if (this.filterType === 'experience') {
          return b.ExpRate - a.ExpRate;
        }
        return 0;
      });
  }

  getRateColor(rate: number): string {
    // Normalize the rate to a value between 0 and 1
    const normalizedRate = Math.max(0, Math.min(rate, 100)) / 100;
    // Calculate the color: red to green
    const red = Math.round((1 - normalizedRate) * 255);
    const green = Math.round(normalizedRate * 255);
    return `rgb(${red}, ${green}, 0)`;
  }
}
