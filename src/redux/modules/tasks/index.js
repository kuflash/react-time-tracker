import { createAction, createReducer } from 'redux-act';
import uuid from 'uuid';

export const startTask = createAction('RTT/START_TASK');
export const stopTask = createAction('RTT/STOP_TASK');

const initialState = {
  items: {},
  activeTaskId: null,
};

const handleStartTask = (state, payload) => {
  const taskId = uuid();
  const { taskName } = payload;

  return {
    ...state,
    items: {
      ...state.items,
      [taskId]: {
        id: taskId,
        startTime: Date.now(),
        taskName,
      },
    },
    activeTaskId: taskId,
  };
};

const handleStopTask = (state, payload) => {
  const newState = { ...state };
  const { id, taskName } = payload;

  newState.items[id] = {
    ...newState.items[id],
    stopTime: Date.now(),
    taskName,
  };
  newState.activeTaskId = null;

  return newState;
};

const reducer = createReducer({
  [startTask]: handleStartTask,
  [stopTask]: handleStopTask,
}, initialState);

export default reducer;
