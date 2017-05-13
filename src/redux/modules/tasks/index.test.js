import uuid from 'uuid';
import reducer, { startTask, stopTask } from './index';

const id = uuid();
const taskName = 'TASK_NAME';
const startTime = Date.now();
const stopTime = Date.now();

test('start task', () => {
  const initialState = {};
  const source = reducer(initialState, startTask({ id, taskName, startTime }));
  const etalon = {
    items: {
      [id]: { id, taskName, startTime },
    },
    activeTaskId: id,
  };
  expect(source).toEqual(etalon);
});

test('stop task', () => {
  const initialState = {
    items: {
      [id]: { id, taskName, startTime },
    },
    activeTaskId: id,
  };
  const source = reducer(initialState, stopTask({ id, taskName, stopTime }));
  const etalon = {
    items: {
      [id]: { id, taskName, startTime, stopTime },
    },
    activeTaskId: null,
  };
  expect(source).toEqual(etalon);
});
