import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  taskId: PropTypes.number,
  type: PropTypes.string,
  comment: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
});
