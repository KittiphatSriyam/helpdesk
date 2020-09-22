import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RepairService } from '../services/repair.service';
@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.less'],
})
export class RepairComponent implements OnInit {
  tabPage = 0;
  constructor(private rs: RepairService) {}
  problem: any;
  @ViewChild('showQue', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;
  ngOnInit(): void {}

  setTabPage(page: number) {
    this.tabPage = page;
  }
  onTabChanged() {
    this.rs.getProblemLimitedPending(0, 10).subscribe((data) => {
      this.problem = data;
      this.rerenderShowQue();
    });
  }

  rerenderShowQue() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }
}
