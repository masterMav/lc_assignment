const { task1, task2 } = require('./part-2');

describe('#Part2', () => {
  it('task 1 should meet the expected data', () => {
    expect(task1()).toStrictEqual({ premium: 300, fee: 45 });
  });

  it('task 2 should meet the expected data', () => {
    expect(task2()).toStrictEqual({ premium: 315, fee: 30 });
  });

  it('tasks should ignore negative, null or undefined premium or fee prices.', () => {
    expect(task1()).toStrictEqual({ premium: 300, fee: 45 });
  });
});
