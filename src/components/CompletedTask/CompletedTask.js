import React, { PropTypes } from 'react';
import { getHoursDuration } from '../../helpers/duration';

const CompletedTask = ({ name, duration }) => (
  <tr>
    <td>{name} | {getHoursDuration(duration)}</td>
  </tr>
);

CompletedTask.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
};

CompletedTask.defaultProps = {
  name: '',
  duration: 0,
};

export default CompletedTask;
