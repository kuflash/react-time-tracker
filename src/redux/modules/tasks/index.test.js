import uuid from 'uuid';
import reducer, {
  startTask,
  stopTask,
  removeTask,
} from './index';

const id = uuid();
const taskName = 'TASK_NAME';
const startTime = Date.now();
const stopTime = Date.now();

test('start task', () => {
  const initialState = {};
  const result = reducer(initialState, startTask({ id, taskName, startTime }));
  const etalon = {
    items: {
      [id]: { id, taskName, startTime },
    },
    activeTaskId: id,
  };
  expect(result).toEqual(etalon);
});

test('stop task', () => {
  const initialState = {
    items: {
      [id]: { id, taskName, startTime },
    },
    activeTaskId: id,
  };
  const result = reducer(initialState, stopTask({ id, taskName, stopTime }));
  const etalon = {
    items: {
      [id]: { id, taskName, startTime, stopTime },
    },
    activeTaskId: '',
  };
  expect(result).toEqual(etalon);
});

test('remove task', () => {
  const initialState = {
    items: {
      [id]: { id, taskName, startTime, stopTime },
    },
    activeTaskId: '',
  };
  const result = reducer(initialState, removeTask({ id }));
  expect(result.items[id]).toBeUndefined();
});
