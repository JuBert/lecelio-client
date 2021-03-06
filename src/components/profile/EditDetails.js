import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { editUserDetails } from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
// MUI stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme.spreadStyles,
  editButton: {
    marginLeft: 'auto',
  },
});

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.bio ? credentials.website : '',
      location: credentials.bio ? credentials.location : '',
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.editButton}>
          <MyButton
            tip="Edit details"
            onClick={this.handleOpen}
            className={classes.editButton}
          >
            <EditIcon color="primary" />
          </MyButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  name="bio"
                  type="text"
                  label="Bio"
                  multiline
                  rows="3"
                  placeholder="A short bio about yourself"
                  className={classes.TextField}
                  value={this.state.bio}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <TextField
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="Your personal/professional website"
                  className={classes.TextField}
                  value={this.state.website}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
                <TextField
                  name="location"
                  type="text"
                  label="Location"
                  placeholder="Where you live"
                  className={classes.TextField}
                  value={this.state.location}
                  onChange={this.handleChange}
                  fullWidth
                ></TextField>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
