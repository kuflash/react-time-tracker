import React, { Component, PropTypes } from 'react';
import { compose, filter, values } from 'ramda';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/tasks';

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  activeTaskId: state.tasks.activeTaskId,
});

const mapDispatchToProps = dispatch => ({
  startTask: ({ taskName }) => dispatch(actions.startTask({ taskName })),
  stopTask: ({ id, taskName }) => dispatch(actions.stopTask({ id, taskName })),
});

class App extends Component {

  static propTypes = {
    tasks: PropTypes.object,
    activeTaskId: PropTypes.string,
    startTask: PropTypes.func,
    stopTask: PropTypes.func,
  };

  static defaultProps = {
    activeTaskId: null,
    tasks: [],
    startTask: () => {},
    stopTask: () => {},
  }

  state = {
    taskName: '',
    isRunning: false,
  };

  handleStartTask = (event) => {
    event.preventDefault();

    this.toggleRunningTask();

    const { taskName } = this.state;
    const { startTask } = this.props;

    startTask({ taskName });
  };

  handleStopTask = (event) => {
    event.preventDefault();

    this.toggleRunningTask();

    const { taskName } = this.state;
    const { stopTask, activeTaskId } = this.props;

    stopTask({
      id: activeTaskId,
      taskName,
    });
  };

  handleChangeTaskName = (event) => {
    this.setState({
      taskName: event.target.value,
    });
  };

  toggleRunningTask = () => {
    this.setState({
      isRunning: !this.state.isRunning,
      taskName: this.state.isRunning ? '' : this.state.taskName,
    });
  };

  isNotRunningTask = activeTaskId => task => task.id !== activeTaskId;

  renderTask(task) {
    return (
      <li key={task.id}>{task.taskName}</li>
    );
  }

  render() {
    const { taskName, isRunning } = this.state;
    const { tasks, activeTaskId } = this.props;
    const finishedTasks = compose(
      values(),
      filter(this.isNotRunningTask(activeTaskId)),
    )(tasks);

    return (
      <div>
        <form onSubmit={isRunning ? this.handleStopTask : this.handleStartTask}>
          <input
            type='text'
            value={taskName}
            onChange={this.handleChangeTaskName}
          />
          <button>{isRunning ? 'Stop' : 'Start'}</button>
        </form>
        <ul>
          {finishedTasks.map(this.renderTask)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
