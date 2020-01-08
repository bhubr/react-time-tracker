import PropTypes from 'prop-types';
import timeboxPropTypes from './time-slice';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  active: PropTypes.bool,
  critical: PropTypes.bool,
  done: PropTypes.bool,
  timeboxes: PropTypes.arrayOf(timeboxPropTypes),
});
