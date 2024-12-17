import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO',
      photo: 'assets/team/john-doe.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'CTO',
      photo: 'assets/team/jane-smith.jpg'
    },
    {
      name: 'Mark Johnson',
      position: 'Lead Developer',
      photo: 'assets/team/mark-johnson.jpg'
    }
    // Add more team members as needed
  ];

}
