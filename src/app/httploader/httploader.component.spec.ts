import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttploaderComponent } from './httploader.component';

describe('HttploaderComponent', () => {
  let component: HttploaderComponent;
  let fixture: ComponentFixture<HttploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
