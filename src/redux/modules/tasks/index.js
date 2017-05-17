import { createAction, createReducer } from 'redux-act';
import { omit } from 'ramda';

export const startTask = createAction('RTT/START_TASK');
export const stopTask = createAction('RTT/STOP_TASK');
export const removeTask = createAction('RTT/REMOVE_TASK');

const initialState = {
  items: {},
  activeTaskId: null,
};

const handleStartTask = (state, payload) => {
  const {
    id,
    taskName,
    startTime,
  } = payload;

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

const handleStopTask = (state, payload) => {
  const {
    id,
    taskName,
    stopTime,
  } = payload;

  const newState = { ...state };

  newState.items[id] = {
    ...newState.items[id],
    stopTime,
    taskName,
  };
  newState.activeTaskId = null;

  return newState;
};

const handleRemoveTask = (state, payload) => {
  const { id } = payload;
  return {
    ...state,
    items: omit(id, state.items),
  };
};

const reducer = createReducer({
  [startTask]: handleStartTask,
  [stopTask]: handleStopTask,
  [removeTask]: handleRemoveTask,
}, initialState);

export default reducer;
