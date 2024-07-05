import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculoDoradoPageComponent } from './circulo-dorado-page.component';

describe('CirculoDoradoPageComponent', () => {
  let component: CirculoDoradoPageComponent;
  let fixture: ComponentFixture<CirculoDoradoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculoDoradoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculoDoradoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
