import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  pageRender: string = 'Schedule';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  adminLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigateByUrl('/admin');
  }
  menuSelected(page) {
    this.pageRender = page;
  }
}
