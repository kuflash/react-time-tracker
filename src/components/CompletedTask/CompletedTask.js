import React from 'react';
import PropTypes from 'prop-types';
import './CompletedTask.css';

const CompletedTask = ({ taskName, duration, onRemoveTask, onStartTask }) => (
  <tr className='completedTask'>
    <td className='completedTask__name'>{taskName}</td>
    <td className='completedTask__duration'>{duration}</td>
    <td className='completedTask__actions'>
      <button
        className='completedTask__action completedTask__action_type_restart'
        title='Restart'
        onClick={onStartTask}
      />
      <button
        className='completedTask__action completedTask__action_type_delete'
        title='Delete'
        onClick={onRemoveTask}
      />
    </td>
  </tr>
);

CompletedTask.propTypes = {
  taskName: PropTypes.string,
  duration: PropTypes.string,
  onRemoveTask: PropTypes.func,
  onStartTask: PropTypes.func,
};

CompletedTask.defaultProps = {
  taskName: '',
  duration: '',
  onRemoveTask: () => {},
  onStartTask: () => {},
};

export default CompletedTask;
