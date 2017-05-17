import React, { PropTypes } from 'react';
import { getHoursDuration } from '../../helpers/duration';
import './CompletedTask.css';

const CompletedTask = ({ taskName, startTime, stopTime, onRemoveTask }) => (
  <tr className='completedTask'>
    <td className='completedTask__name'>{taskName}</td>
    <td className='completedTask__duration'>{getHoursDuration(stopTime - startTime)}</td>
    <td className='completedTask__actions'>
      <button className='completedTask__action completedTask__action_type_restart' title='Restart' />
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
  startTime: PropTypes.number,
  stopTime: PropTypes.number,
  onRemoveTask: PropTypes.func,
};

CompletedTask.defaultProps = {
  taskName: '',
  startTime: 0,
  stopTime: 0,
  onRemoveTask: () => {},
};

export default CompletedTask;
