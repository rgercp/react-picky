import React from 'react';
import PropTypes from 'prop-types';
class Drawer extends React.Component {
  render() {
    const { open, id } = this.props;
    if (open) {
      return (
        <div className="picky__dropdown" id={id}>
          <div>{this.props.children}</div>
        </div>
      );
    }
    return null;
  }
}

Drawer.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.element
};

export default Drawer;
