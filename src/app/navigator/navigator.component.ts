import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';

interface ProfileByToken {
  profile: {};
  status: Number;
  message: '';
}
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.less'],
})
export class NavigatorComponent implements OnInit {
  profile: any;
  constructor(private ms: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.ms.getProfile().subscribe((profile: ProfileByToken) => {
      if (profile.status == 500) {
        alert(profile.message);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
      } else {
        const personalInfo = profile.profile;
        this.profile = personalInfo;
      }
    });
  }
  logout(event: any): void {
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
