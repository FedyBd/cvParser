import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  login(user_credentials: { password: any; email: any }) {
    return this.http.post(`${this.baseUrl}/users/login`, user_credentials,{withCredentials:true});
  }

  getOfferById(offerId: number) {
    return this.http.get('http://localhost:3000/job-description/offer/' + offerId + '/')
  }
  upload(file: File, offerId: number,candidateId:number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('offerId', offerId.toString());
    formData.append('candidateId',candidateId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
  getUser(){
    return this.http.get(`${this.baseUrl}/users/user`, {withCredentials:true});
  }
  download(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }


  getCandidates(jobId: number) {
    return this.http.get(`${this.baseUrl}/candidates/${jobId}`, {withCredentials:true});
  }

  checkCanJob(candidateId: number, offerId: number) {
    return this.http.get(`${this.baseUrl}/job-description/check/${offerId}/${candidateId}`, {withCredentials:true});
  }

  addJobOffer(jobOffer: {
    ownerId:null,
    experienceRequiredInYears: null;
    jobTitle: string;
    jobDescription: string;
    requiredSkills: string
  }) {
    console.log(jobOffer.ownerId);
    return this.http.post(`${this.baseUrl}/job-description`, jobOffer, {withCredentials:true});
  }
}
