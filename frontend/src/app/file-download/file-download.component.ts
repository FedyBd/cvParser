// src/app/file-download/file-download.component.ts
import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {
  files: any[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {
    console.log(this.files);
    this.fileService.getAllFiles().subscribe(data => {
      this.files = data;
    });
  }

  onDownload(id: number) {
    this.fileService.download(id).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf'; // Replace with appropriate filename
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
