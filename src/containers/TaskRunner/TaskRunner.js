import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/modules/tasks';

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
    const { isRunning } = this.props;
    const { taskName } = this.state;

    return (
      <form onSubmit={isRunning ? this.handleStopTask : this.handleStartTask}>
        <input
          type='text'
          value={taskName}
          onChange={this.handleChangeName}
        />
        <button>{isRunning ? 'Stop' : 'Start'}</button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskRunnerContainer);