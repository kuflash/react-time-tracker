import { createAction, createReducer } from 'redux-act';
import uuid from 'uuid';

export const startTask = createAction(
  'RTT/START_TASK',
  payload => payload,
  () => ({
    id: uuid(),
    startTime: Date.now(),
  }),
);
export const stopTask = createAction(
  'RTT/STOP_TASK',
  payload => payload,
  () => ({
    stopTime: Date.now(),
  }),
);

const initialState = {
  items: {},
  activeTaskId: null,
};

const handleStartTask = (state, payload, meta) => {
  const { id, startTime } = meta;
  const { taskName } = payload;

  return {
    ...state,
    items: {
      ...state.items,
      [id]: {
        id,
        startTime,
        taskName,
      },
    },
    activeTaskId: id,
  };
};

const handleStopTask = (state, payload, meta) => {
  const { stopTime } = meta;
  const { id, taskName } = payload;
  const newState = { ...state };

  newState.items[id] = {
    ...newState.items[id],
    stopTime,
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
