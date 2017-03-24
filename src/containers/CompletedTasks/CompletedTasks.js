import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { not, equals } from 'ramda';
import { getSortedCompletedTasks } from '../../redux/modules/tasks/selectors';

const mapStateToProps = (state, props) => ({
  tasks: getSortedCompletedTasks(state, props),
});

class CompletedTasksContainer extends Component {
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

  shouldComponentUpdate(nextProps) {
    return not(equals(this.props)(nextProps));
  }

  renderTask = task => (
    <tr key={task.id}>
      <td>{task.taskName}</td>
    </tr>
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
