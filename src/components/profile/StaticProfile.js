import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// MUI icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.spreadStyles,
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  imgWrap: {
    justifyContent: 'center',
    display: 'flex',
  },
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;
  return (
    <Fragment>
      <div className={classes.profile}>
        <div className={classes.imgWrap}>
          <Avatar className={classes.avatar} src={imageUrl} />
        </div>
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
        </div>
      </div>
    </Fragment>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
