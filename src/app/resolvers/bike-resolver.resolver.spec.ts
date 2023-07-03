import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bikeResolverResolver } from './bike-resolver.resolver';

describe('bikeResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => bikeResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
