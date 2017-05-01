import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSortedCompletedTasks } from '../../redux/modules/tasks/selectors';
import CompletedTask from '../../components/CompletedTask';

const mapStateToProps = (state, props) => ({
  tasks: getSortedCompletedTasks(state, props),
});

class CompletedTasksContainer extends PureComponent {
  static propTypes = {
    tasks: PropTypes.array,
    sortProperty: PropTypes.string,
    sortDirection: PropTypes.string,
  }

  static defaultProps = {
    tasks: [],
    sortProperty: 'stopTime',
    sortDirection: 'asc',
  }

  renderTask = task => (
    <CompletedTask
      key={task.id}
      name={task.taskName}
      duration={task.stopTime - task.startTime}
    />
  )

  render() {
    const { tasks } = this.props;
    return (
      <table>
        <tbody>
          {tasks.map(this.renderTask)}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, null)(CompletedTasksContainer);
