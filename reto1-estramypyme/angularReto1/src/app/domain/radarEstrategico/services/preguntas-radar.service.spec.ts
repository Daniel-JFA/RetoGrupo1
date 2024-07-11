import { TestBed } from '@angular/core/testing';

import { PreguntasRadarService } from './preguntas-radar.service';

describe('PreguntasRadarService', () => {
  let service: PreguntasRadarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasRadarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
