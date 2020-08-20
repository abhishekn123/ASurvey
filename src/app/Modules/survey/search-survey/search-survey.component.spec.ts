import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSurveyComponent } from './search-survey.component';

describe('SearchSurveyComponent', () => {
  let component: SearchSurveyComponent;
  let fixture: ComponentFixture<SearchSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
