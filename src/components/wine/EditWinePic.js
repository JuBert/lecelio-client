import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit'; // Redux stuff
import { connect } from 'react-redux';
import { uploadWineImage } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'relative',
    left: '161%',
  },
};

class EditWinePic extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  updateWinePic = () => {
    this.props.uploadWineImage(this.props.wineId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Bottle"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <EditIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this bottle?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateWinePic} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditWinePic.propTypes = {
  uploadWineImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  wineId: PropTypes.string.isRequired,
};

export default connect(null, { uploadWineImage })(
  withStyles(styles)(EditWinePic)
);
