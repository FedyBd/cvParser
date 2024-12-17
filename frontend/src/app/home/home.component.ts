import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private apiservice:ApiService){}
welcome='';
ngOnInit() {
  this.apiservice.getUser().subscribe(
    (res:any)=>{
      localStorage.setItem('authenticated','true');
      this.welcome=`welcome ${res.username} at `
    },(err:any)=>{
      localStorage.setItem('authenticated','false');
      throw new Error(err);
    }
  )
}
}
