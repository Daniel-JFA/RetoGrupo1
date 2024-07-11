import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularipPreguntasRadarComponent } from './formulario-preguntas-radar.component';

describe('FormularipPreguntasRadarComponent', () => {
  let component: FormularipPreguntasRadarComponent;
  let fixture: ComponentFixture<FormularipPreguntasRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularipPreguntasRadarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularipPreguntasRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
