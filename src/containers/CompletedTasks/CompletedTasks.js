import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, memoize, not } from 'ramda';
import uuid from 'uuid';
import * as actions from '../../redux/modules/tasks';
import { getSortedCompletedTasks } from '../../redux/modules/tasks/selectors';
import CompletedTask from '../../components/CompletedTask';
import './CompletedTasks.css';

const mapStateToProps = (state, props) => ({
  tasks: getSortedCompletedTasks(state, props),
});

const mapDispatchToProps = dispatch => ({
  removeTask: id => () => dispatch(actions.removeTask({ id })),
  startTask: taskName => () => dispatch((_dispatch, getState) => {
    const { tasks: { activeTaskId } } = getState();

    if (not(isEmpty(activeTaskId))) {
      dispatch(actions.stopTask({
        id: activeTaskId,
        stopTime: Date.now(),
      }));
    }

    dispatch(actions.startTask({
      id: uuid(),
      startTime: Date.now(),
      taskName,
    }));
  }),
});

class CompletedTasksContainer extends PureComponent {

  static propTypes = {
    tasks: PropTypes.array,
    sortProperty: PropTypes.string,
    sortDirection: PropTypes.string,
    removeTask: PropTypes.func,
    startTask: PropTypes.func,
  }

  static defaultProps = {
    tasks: [],
    sortProperty: 'stopTime',
    sortDirection: 'asc',
    removeTask: () => {},
    startTask: () => {},
  }

  removeTask = memoize(id => this.props.removeTask(id));

  startTask = taskName => this.props.startTask(taskName);

  renderTask = task => (
    <CompletedTask
      key={task.id}
      taskName={task.taskName}
      startTime={task.startTime}
      stopTime={task.stopTime}
      onRemoveTask={this.removeTask(task.id)}
      onStartTask={this.startTask(task.taskName)}
    />
  )

  render() {
    const { tasks } = this.props;
    return (
      <table className='completedTasks'>
        <thead className='completedTasks__header'>
          <tr>
            <th className='completedTasks__title completedTasks__title_type_name'>
              Name
            </th>
            <th className='completedTasks__title completedTasks__title_type_duration'>
              Duration
            </th>
            <th className='completedTasks__title completedTasks__title_type_actions'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='completedTasks__list'>
          {tasks.map(this.renderTask)}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTasksContainer);
