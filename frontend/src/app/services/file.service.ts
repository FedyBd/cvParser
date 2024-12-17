// src/app/file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  download(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/downloads`);
  }
}
