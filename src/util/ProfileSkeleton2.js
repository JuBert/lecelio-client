import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI stuff
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
  ...theme.spreadStyles,
  imgWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ProfileSkeleton2 = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classes.profile}>
        <div className={classes.imgWrap}>
          <Skeleton
            variant="circle"
            width={60}
            height={60}
            style={{ marginBottom: 6 }}
          />
        </div>
        <div className={classes.imgWrap}>
          <hr />
          <div className="profile-details">
            <Skeleton
              animation="wave"
              height={10}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <hr />
            <Skeleton
              animation="wave"
              height={10}
              width={200}
              style={{ marginBottom: 6 }}
            />

            <hr />
            <Skeleton
              animation="wave"
              height={10}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <hr />
            <Skeleton
              animation="wave"
              height={10}
              width={200}
              style={{ marginBottom: 6 }}
            />
            <hr />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileSkeleton2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton2);
