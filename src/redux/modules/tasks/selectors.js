import { createSelector, createSelectorCreator } from 'reselect';
import {
  pipe,
  values,
  omit,
  sort,
  prop,
  ascend,
  descend,
  cond,
  equals,
  memoize,
} from 'ramda';

const createDeepEqualSelector = createSelectorCreator(memoize, equals);

export const getTasksItems = state => state.tasks.items;
export const getActiveTaskId = state => state.tasks.activeTaskId;
export const getSortRuleByProperty = (
  (state, { sortProperty, sortDirection }) => cond([
    [equals('asc'), () => ascend(prop(sortProperty))],
    [equals('desc'), () => descend(prop(sortProperty))],
  ])(sortDirection)
);

export const getCompletedTasks = createSelector(
  [getTasksItems, getActiveTaskId],
  (tasks, activeTaskId) => pipe(omit(activeTaskId), values)(tasks),
);

export const getSortedCompletedTasks = createDeepEqualSelector(
  [getCompletedTasks, getSortRuleByProperty],
  (tasks, sortRule) => sort(sortRule, tasks),
);
