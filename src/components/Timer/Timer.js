import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { not, equals } from 'ramda';
import { getTimerDuration } from '../../helpers/duration';
import './Timer.css';

class Timer extends PureComponent {

  static propTypes = {
    start: PropTypes.number,
  }

  static defaultProps = {
    start: 0,
  }

  state = {
    diff: 0,
  }

  componentDidMount() {
    if (this.isCanStart(this.props.start)) {
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isCanStart(nextProps.start)) {
      this.stopTimer();
      this.resetTimer();
    } else {
      this.startTimer();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      not(equals(this.props)(nextProps)) ||
      not(equals(this.state)(nextState))
    );
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  calculateDiff = () => {
    this.setState({
      diff: Date.now() - this.props.start,
    });
  }

  isCanStart = startTime => startTime !== 0;

  startTimer = () => {
    this.stopTimer();
    this.timer = setInterval(this.calculateDiff, 1000);
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      diff: 0,
    });
  }

  timer = null

  render() {
    const { diff } = this.state;
    return <span className='timer'>{ getTimerDuration(diff) }</span>;
  }
}

export default Timer;
