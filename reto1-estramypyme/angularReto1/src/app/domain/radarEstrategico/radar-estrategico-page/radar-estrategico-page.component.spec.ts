import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarEstrategicoPageComponent } from './radar-estrategico-page.component';

describe('RadarEstrategicoPageComponent', () => {
  let component: RadarEstrategicoPageComponent;
  let fixture: ComponentFixture<RadarEstrategicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarEstrategicoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarEstrategicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
