import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReasonComponent } from './report-reason.component';

describe('ReportReasonComponent', () => {
  let component: ReportReasonComponent;
  let fixture: ComponentFixture<ReportReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
