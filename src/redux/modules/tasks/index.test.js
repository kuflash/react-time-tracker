import uuid from 'uuid';
import reducer, { startTask, stopTask } from './index';

const ID = uuid();
const TASK_NAME = 'TASK_NAME';
const START_TIME = Date.now();
const STOP_TIME = Date.now();

it('start task', () => {
  const source = reducer(undefined, startTask({
    id: ID,
    taskName: TASK_NAME,
    startTime: START_TIME,
  }));
  const etalon = {
    items: {
      [ID]: {
        id: ID,
        taskName: TASK_NAME,
        startTime: START_TIME,
      },
    },
    activeTaskId: ID,
  };
  expect(source).toEqual(etalon);
});

it('stop task', () => {
  const source = reducer({
    items: {
      [ID]: {
        id: ID,
        taskName: TASK_NAME,
        startTime: START_TIME,
      },
    },
    activeTaskId: ID,
  }, stopTask({
    id: ID,
    taskName: TASK_NAME,
    stopTime: STOP_TIME,
  }));
  const etalon = {
    items: {
      [ID]: {
        id: ID,
        taskName: TASK_NAME,
        startTime: START_TIME,
        stopTime: STOP_TIME,
      },
    },
    activeTaskId: null,
  };
  expect(source).toEqual(etalon);
});
