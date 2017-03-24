import React, { Component } from 'react';
import TaskRunner from '../TaskRunner';
import CompletedTasks from '../CompletedTasks';

class App extends Component {
  render() {
    return (
      <div>
        <TaskRunner />
        <CompletedTasks sortProperty={'startTime'} sortDirection={'desc'} />
      </div>
    );
  }
}

export default App;
