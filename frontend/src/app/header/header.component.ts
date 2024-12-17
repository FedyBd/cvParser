import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Emitters} from "../Emitters/emitters";
import {ApiService} from "../services/api.service";
import {AuthService} from "../login/authservice";

@Component({
  selector: 'app-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  IsAuthenticated!: boolean;
  constructor(private http:HttpClient, private router: Router, private apiservice: ApiService,
              private authService: AuthService) {
  }
  ngOnInit(): void {

    // Subscribe to the authStatus observable
    this.authService.authStatus$.subscribe(
      (isAuthenticated: boolean) => {
        this.IsAuthenticated = isAuthenticated; // Update the variable
        console.log('Auth status changed:', isAuthenticated);
      }
    );

    this.apiservice.getUser().subscribe(
      (res:any)=>{
        this.IsAuthenticated = true;
        localStorage.setItem('authenticated','true');
      },(err:any)=>{
        this.IsAuthenticated = false;
        localStorage.setItem('authenticated','false');
        throw new Error(err);
      }
    )
  }

  logout(){
    this.http.post('http://localhost:3000/users/logout',{},{withCredentials:true}
    ).subscribe(()=>{
      localStorage.removeItem('access_token');
      localStorage.removeItem('userType');
      localStorage.setItem('authenticated','false');
      this.IsAuthenticated=false;
      this.authService.logout();
      this.router.navigateByUrl('/login')

    })
  }
}
