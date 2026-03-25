describe('Backend Basic Tests', () => {
  test('should pass basic math', () => {
    expect(1 + 1).toBe(2);
  });
  test('should check string', () => {
    expect('mern-app').toBeTruthy();
  });
});

// testing