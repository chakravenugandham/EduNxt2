import { RoutingModule } from './routing.module';

fdescribe('RoutingModule', () => {
  let routingModule: RoutingModule;

  beforeEach(() => {
    routingModule = new RoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModule).toBeTruthy();
  });
});
