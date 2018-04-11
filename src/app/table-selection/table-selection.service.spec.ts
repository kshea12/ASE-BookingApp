import { TestBed, inject } from '@angular/core/testing';

import { TableSelectionService } from './table-selection.service';

describe('TableSelectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableSelectionService]
    });
  });

  it('should be created', inject([TableSelectionService], (service: TableSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
