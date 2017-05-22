import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, not } from 'ramda';
import uuid from 'uuid';
import cx from 'classnames';
import Timer from '../../components/Timer';
import * as actions from '../../redux/modules/tasks';
import './TaskRunner.css';

const mapStateToProps = state => ({
  isRunning: not(isEmpty(state.tasks.activeTaskId)),
  activeTask: state.tasks.items[state.tasks.activeTaskId],
});

const mapDispatchToProps = {
  startTask: actions.startTask,
  stopTask: actions.stopTask,
  renameTask: actions.renameTask,
};

class TaskRunnerContainer extends PureComponent {
  static propTypes = {
    isRunning: PropTypes.bool,
    activeTask: PropTypes.object,
    startTask: PropTypes.func,
    stopTask: PropTypes.func,
    renameTask: PropTypes.func,
  }

  static defaultProps = {
    isRunning: false,
    activeTask: {},
    startTask: () => {},
    stopTask: () => {},
    renameTask: () => {},
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

  componentWillReceiveProps(nextProps) {
    const { activeTask } = nextProps;

    this.setState({
      taskName: activeTask.taskName || '',
    });
  }

  componentDidUpdate() {
    this.taskNameInput.focus();
  }

  handleStartTask = (event) => {
    event.preventDefault();

    const { startTask } = this.props;
    const { taskName } = this.state;
    const id = uuid();
    const startTime = Date.now();

    startTask({ id, taskName, startTime });
  }

  handleStopTask = (event) => {
    event.preventDefault();

    const { stopTask, activeTask: { id } } = this.props;
    const { taskName } = this.state;
    const stopTime = Date.now();

    stopTask({ id, taskName, stopTime });

    this.setState({
      taskName: '',
    });
  }

  handleSubmit = (event) => {
    const { isRunning } = this.props;
    if (isRunning) this.handleStopTask(event);
    else this.handleStartTask(event);
  }

  handleChangeName = (event) => {
    const { renameTask, isRunning, activeTask: { id } } = this.props;
    const taskName = event.target.value;

    if (isRunning) renameTask({ id, taskName });
    else this.setState({ taskName });
  }

  setTaskNameInput = (input) => { this.taskNameInput = input; }

  getButtonText = () => this.props.isRunning ? 'Stop' : 'Start';

  render() {
    const { isRunning, activeTask } = this.props;
    const { taskName } = this.state;
    const rootClasses = cx('task-runner', {
      'task-runner_state_running': isRunning,
    });

    return (
      <form
        className={rootClasses}
        onSubmit={this.handleSubmit}
      >
        <input
          className='task-runner__name'
          type='text'
          value={taskName}
          placeholder='Enter task name...'
          onChange={this.handleChangeName}
          ref={this.setTaskNameInput}
        />
        <div className='task-runner__timer'>
          <Timer start={activeTask.startTime} />
        </div>
        <button className='task-runner__button'>{this.getButtonText()}</button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskRunnerContainer);
