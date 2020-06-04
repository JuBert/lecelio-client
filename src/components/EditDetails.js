import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme,
});

class EditDetails extends Component {
  render() {
    return <div></div>;
  }
}

EditDetails.PropTypes = {
  editUserDetails: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyle(style)(EditDetails)
);
