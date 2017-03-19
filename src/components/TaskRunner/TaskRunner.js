import React, { Component, PropTypes } from 'react';

class TaskRunner extends Component {
  static propTypes = {
    isRunning: PropTypes.bool,
    taskName: PropTypes.string,
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onChangeName: PropTypes.func,
  }

  static defaultProps = {
    isRunning: false,
    taskName: '',
    onStart: () => {},
    onStop: () => {},
    onChangeName: () => {},
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      isRunning,
      onStart,
      onStop,
    } = this.props;

    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
  }

  handleInputChange = (event) => {
    const { onChangeName } = this.props;
    onChangeName(event.target.value);
  }

  getTextRunnerButton = () => this.props.isRunning ? 'Stop' : 'Start';

  render() {
    const {
      taskName,
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={taskName}
          onChange={this.handleInputChange}
        />
        <button>{this.getTextRunnerButton()}</button>
      </form>
    );
  }
}

export default TaskRunner;
