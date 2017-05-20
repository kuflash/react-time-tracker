import { createAction, createReducer } from 'redux-act';
import { assoc, compose, dissoc, lensProp, over, set } from 'ramda';

export const startTask = createAction('RTT/START_TASK');
export const stopTask = createAction('RTT/STOP_TASK');
export const removeTask = createAction('RTT/REMOVE_TASK');

const initialState = {
  items: {},
  activeTaskId: '',
};

const lensTasks = lensProp('items');
const lensActiveTaskId = lensProp('activeTaskId');

const handleStartTask = (state, payload) => {
  const setActiveTask = id => prevState => set(lensActiveTaskId, id, prevState);
  const addNewTask = ({ id, taskName, startTime }) => prevState => over(
    lensTasks,
    assoc(id, { id, taskName, startTime }),
    prevState,
  );

  return compose(
    addNewTask(payload),
    setActiveTask(payload.id),
  )(state);
};

const handleStopTask = (state, payload) => {
  const lensTaskById = id => compose(lensTasks, lensProp(id));
  const unsetActiveTask = prevState => set(lensActiveTaskId, '', prevState);
  const updateTaskData = ({ id, taskName, stopTime }) => prevState => over(
    lensTaskById(id),
    task => ({ ...task, taskName, stopTime }),
    prevState,
  );

  return compose(
    updateTaskData(payload),
    unsetActiveTask,
  )(state);
};

const handleRemoveTask = (state, payload) => {
  const removeTaskById = id => prevState => over(
    lensTasks,
    dissoc(id),
    prevState,
  );

  return removeTaskById(payload.id)(state);
};

const reducer = createReducer({
  [startTask]: handleStartTask,
  [stopTask]: handleStopTask,
  [removeTask]: handleRemoveTask,
}, initialState);

export default reducer;
