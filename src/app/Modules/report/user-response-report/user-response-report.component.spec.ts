import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResponseReportComponent } from './user-response-report.component';

describe('UserResponseReportComponent', () => {
  let component: UserResponseReportComponent;
  let fixture: ComponentFixture<UserResponseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResponseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResponseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
