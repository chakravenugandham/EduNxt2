import { NullHandlePipe } from './null-handle.pipe';

describe('NullHandlePipe', () => {
  it('create an instance', () => {
    const pipe = new NullHandlePipe();
    expect(pipe).toBeTruthy();
  });
});
