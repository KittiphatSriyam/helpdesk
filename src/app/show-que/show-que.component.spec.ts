import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQueComponent } from './show-que.component';

describe('ShowQueComponent', () => {
  let component: ShowQueComponent;
  let fixture: ComponentFixture<ShowQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
