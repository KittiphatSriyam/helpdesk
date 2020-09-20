import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Router } from '@angular/router';

interface Profile {
  firstname: '';
  surname: '';
}
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.less'],
})
export class NavigatorComponent implements OnInit {
  profile: Profile;
  constructor(private ms: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.ms.getProfile().subscribe((profile: Profile) => {
      this.profile = profile;
    });
  }
  logout(event: any): void {
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
