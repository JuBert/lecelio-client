import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI stuff
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
// MUI icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.spreadStyles,
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    justify: 'center',
    display: 'flex',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
        <Box className={classes.box}>
          <Avatar className={classes.avatar} src={imageUrl} />
        </Box>
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
