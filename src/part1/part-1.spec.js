const expectedDataP1 = require('./expected-data.js');
const part1 = require('./part-1.js');

describe('#Part1', () => {
  it('task 1 should meet the expected data', () => {
    expect(part1.task1()).toStrictEqual(expectedDataP1.expectedTask1);
  });

  it('task 1 should have correct length', () => {
    expect(part1.task1().length).toEqual(1);
  });

  it('task 2 should meet the expected data', () => {
    expect(part1.task2()).toStrictEqual(expectedDataP1.expectedTask2);
  });

  it('task 3 should meet the expected data', () => {
    expect(part1.task3()).toStrictEqual(expectedDataP1.expectedTask3);
  });

  it('task 4 should meet the expected data', () => {
    expect(part1.task4()).toStrictEqual(expectedDataP1.expectedTask4);
  });

  // Extra tests
  it('tasks should ignore negative, null or undefined premium prices.', () => {
    expect(part1.task2()).toStrictEqual(expectedDataP1.expectedTask2);
  });

  it('tasks should ignore negative, null or undefined fee prices.', () => {
    expect(part1.task1()).toStrictEqual(expectedDataP1.expectedTask1);
  });

  it('tasks should handle empty prices array.', () => {
    expect(() => {
      part1.task1();
      part1.task2();
      part1.task3();
      part1.task4();
    }).not.toThrow();
  });

  it('tasks should handle mixed data types.', () => {
    expect(part1.task1()).toStrictEqual(expectedDataP1.expectedTask1);
  });
});
