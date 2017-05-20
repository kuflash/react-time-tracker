import { createAction, createReducer } from 'redux-act';
import { assoc, compose, dissoc, lensProp, over, set } from 'ramda';

export const startTask = createAction('RTT/START_TASK');
export const stopTask = createAction('RTT/STOP_TASK');
export const removeTask = createAction('RTT/REMOVE_TASK');
export const renameTask = createAction('RTT/RENAME_TASK');

const initialState = {
  items: {},
  activeTaskId: '',
};

const lensTasks = lensProp('items');
const lensActiveTaskId = lensProp('activeTaskId');
const lensTaskById = id => compose(lensTasks, lensProp(id));

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
  const unsetActiveTask = prevState => set(lensActiveTaskId, '', prevState);
  const updateTaskData = ({ id, stopTime }) => prevState => over(
    lensTaskById(id),
    task => ({ ...task, stopTime }),
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

const handleRenameTask = (state, payload) => {
  const lensTaskName = id => compose(
    lensTaskById(id),
    lensProp('taskName'),
  );

  return set(
    lensTaskName(payload.id),
    payload.taskName,
    state,
  );
};

const reducer = createReducer({
  [startTask]: handleStartTask,
  [stopTask]: handleStopTask,
  [removeTask]: handleRemoveTask,
  [renameTask]: handleRenameTask,
}, initialState);

export default reducer;
