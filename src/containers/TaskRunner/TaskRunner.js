import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Timer from '../../components/Timer';
import * as actions from '../../redux/modules/tasks';
import './TaskRunner.css';

const mapStateToProps = state => ({
  isRunning: state.tasks.activeTaskId !== null,
  activeTask: state.tasks.items[state.tasks.activeTaskId],
});

const mapDispatchToProps = dispatch => ({
  startTask: ({ taskName }) => dispatch(actions.startTask({ taskName })),
  stopTask: ({ id, taskName }) => dispatch(actions.stopTask({ id, taskName })),
});

class TaskRunnerContainer extends Component {
  static propTypes = {
    isRunning: PropTypes.bool,
    activeTask: PropTypes.object,
    startTask: PropTypes.func,
    stopTask: PropTypes.func,
  }

  static defaultProps = {
    isRunning: false,
    activeTask: {},
    startTask: () => {},
    stopTask: () => {},
  }

  state = {
    taskName: '',
  }

  componentWillMount() {
    const { activeTask } = this.props;

    this.setState({
      taskName: activeTask.taskName || '',
    });
  }

  handleStartTask = (event) => {
    event.preventDefault();

    const { startTask } = this.props;
    const { taskName } = this.state;

    startTask({ taskName });
  }

  handleStopTask = (event) => {
    event.preventDefault();

    const { stopTask, activeTask: { id } } = this.props;
    const { taskName } = this.state;

    stopTask({ id, taskName });

    this.setState({
      taskName: '',
    });
  }

  handleChangeName = (event) => {
    this.setState({
      taskName: event.target.value,
    });
  }

  render() {
    const { isRunning, activeTask } = this.props;
    const { taskName } = this.state;
    const rootClasses = cx('task-runner', {
      'task-runner_state_running': isRunning,
    });

    return (
      <form
        className={rootClasses}
        onSubmit={isRunning ? this.handleStopTask : this.handleStartTask}
      >
        <input
          className='task-runner__name'
          type='text'
          value={taskName}
          placeholder='Enter task name...'
          onChange={this.handleChangeName}
        />
        <div className='task-runner__timer'>
          <Timer start={isRunning ? activeTask.startTime : 0} />
        </div>
        <button className='task-runner__button'>{isRunning ? 'Stop' : 'Start'}</button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskRunnerContainer);
