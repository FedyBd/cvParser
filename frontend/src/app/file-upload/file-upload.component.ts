// src/app/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile!: File ;

  constructor(private fileService: FileService) {}

  onFileChanged(event : any) {
    console.log('hi');
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    console.log(`this the selected file : ${this.selectedFile}`);
    this.fileService.upload(this.selectedFile).subscribe(response => {
      console.log('Upload success:', response);
    }, error => {
      console.error('Upload failed:', error);
    });
  }
}
