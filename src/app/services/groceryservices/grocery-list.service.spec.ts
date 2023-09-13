import { TestBed } from '@angular/core/testing';

import { GroceryListService } from './grocery-list.service';

describe('GroceryListService', () => {
  let service: GroceryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
