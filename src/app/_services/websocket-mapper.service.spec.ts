import { TestBed } from '@angular/core/testing';
import { WebsocketMapper } from './websocket-mapper.service';

describe('WebsocketMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketMapper = TestBed.get(WebsocketMapper);
    expect(service).toBeTruthy();
  });
});
