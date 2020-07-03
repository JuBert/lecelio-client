import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton2 from '../../util/ProfileSkeleton2';
//Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

// MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// MUI icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = (theme) => ({
  ...theme.spreadStyles,
  editButton: {
    marginLeft: 'auto',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: 'auto',
  },
  avatarWrap: {
    marginLeft: 'auto',
  },
  logout: {
    marginRight: 150,
  },
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  hanldeEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Fragment>
          <div className={classes.profile}>
            <Grid container justify="center">
              <Grid item sm={6} className={classes.avatarWrap}>
                <Avatar className={classes.avatar} src={imageUrl} />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
              </Grid>
              <Grid item sm={6}>
                <MyButton
                  tip="Edit profile picture"
                  onClick={this.hanldeEditPicture}
                  btnClassName="button"
                >
                  <EditIcon color="primary" />
                </MyButton>
              </Grid>
            </Grid>
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
                justify="center"
              >
                @{handle}
              </MuiLink>
              <hr />
              <Typography variant="body2">
                <CalendarToday color="primary" fontSize="small" />
                <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </Typography>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <span>
                    <Typography variant="body2">
                      <LocationOn color="primary" fontSize="small" /> {location}
                    </Typography>
                  </span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <Typography variant="body2">
                    <LinkIcon color="primary" fontSize="small" />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {' '}
                      {website}
                    </a>
                  </Typography>
                  <hr />
                </Fragment>
              )}
              <Grid container justify="center">
                <Grid item>
                  <MyButton
                    tip="Logout"
                    onClick={this.handleLogout}
                    tipClassName={classes.logout}
                  >
                    <KeyboardReturn color="primary" />
                  </MyButton>
                </Grid>
                <Grid item>
                  <EditDetails />
                </Grid>
              </Grid>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant="body2" align="center">
            No profile found please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Fragment>
      )
    ) : (
      <ProfileSkeleton2 />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
