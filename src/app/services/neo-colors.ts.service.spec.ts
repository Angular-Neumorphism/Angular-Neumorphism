/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NeoColors } from './neo-colors.service';

describe('Service: NeoColors.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeoColors]
    });
  });

  it('should ...', inject([NeoColors], (service: NeoColors) => {
    expect(service).toBeTruthy();
  }));
});
