import React, { Component } from 'react';
import TaskRunner from '../TaskRunner';
import CompletedTasks from '../CompletedTasks';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className='app'>
        <div className='app__new-task'>
          <TaskRunner />
        </div>
        <div className='app__completedTasks'>
          <CompletedTasks sortProperty={'startTime'} sortDirection={'desc'} />
        </div>
      </main>
    );
  }
}

export default App;
