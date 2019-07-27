import { TestBed } from '@angular/core/testing';

import { TaskServiceService } from './task-service.service';

describe('TaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  });
});
