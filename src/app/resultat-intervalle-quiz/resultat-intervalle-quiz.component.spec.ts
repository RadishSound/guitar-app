import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatIntervalleQuizComponent } from './resultat-intervalle-quiz.component';

describe('ResultatIntervalleQuizComponent', () => {
  let component: ResultatIntervalleQuizComponent;
  let fixture: ComponentFixture<ResultatIntervalleQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatIntervalleQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatIntervalleQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
