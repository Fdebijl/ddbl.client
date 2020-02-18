import { TestBed } from '@angular/core/testing';

import { WebsocketMapperService } from './websocket-mapper.service';

describe('WebsocketMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketMapperService = TestBed.get(WebsocketMapperService);
    expect(service).toBeTruthy();
  });
});
