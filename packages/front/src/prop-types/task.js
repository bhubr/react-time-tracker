import PropTypes from 'prop-types';
import timeSlicePropTypes from './time-slice';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  active: PropTypes.bool,
  critical: PropTypes.bool,
  done: PropTypes.bool,
  timeSlices: PropTypes.arrayOf(timeSlicePropTypes)
});
