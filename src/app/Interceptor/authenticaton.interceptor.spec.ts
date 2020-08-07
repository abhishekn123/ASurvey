import { TestBed } from '@angular/core/testing';

import { AuthenticatonInterceptor } from './authenticaton.interceptor';

describe('AuthenticatonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticatonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticatonInterceptor = TestBed.inject(AuthenticatonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
