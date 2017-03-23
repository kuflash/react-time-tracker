import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/tasks';
import TaskRunner from '../../components/TaskRunner';

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
    const { isRunning, activeTask } = this.props;

    this.setState({
      taskName: isRunning ? activeTask.taskName : '',
    });
  }

  handleStartTask = () => {
    const { startTask } = this.props;
    const { taskName } = this.state;

    startTask({ taskName });
  }

  handleStopTask = () => {
    const { stopTask, activeTask: { id } } = this.props;
    const { taskName } = this.state;

    stopTask({ id, taskName });

    this.setState({
      taskName: '',
    });
  }

  handleChangeName = (newName) => {
    this.setState({
      taskName: newName,
    });
  }

  render() {
    const { isRunning } = this.props;
    return (
      <TaskRunner
        isRunning={isRunning}
        taskName={this.state.taskName}
        onStart={this.handleStartTask}
        onStop={this.handleStopTask}
        onChangeName={this.handleChangeName}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskRunnerContainer);
