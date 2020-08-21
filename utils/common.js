import PropTypes from 'prop-types';

export const datePropType = PropTypes.string;
export const UdaciSliderPropType = PropTypes.exact({
  max: PropTypes.number,
  unit: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
}).isRequired;
