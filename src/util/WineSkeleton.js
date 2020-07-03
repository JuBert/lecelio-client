import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  card: {
    margin: 7,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    margin: 10,
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10,
  },
  image: {
    height: 300,
    width: '90%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  fullLine: {
    height: 15,
    width: '70%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
  },
  smallLine: {
    height: 15,
    width: '30%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
  },
});

const WineSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.cover} image={NoImg} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Lorem ipsum dolor sit amet"
        subheader="December 31, 1999"
      ></CardHeader>
      <CardContent className={classes.cardContent}>
        <div className={classes.image} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
        <div className={classes.halfLine} />
        <div className={classes.smallLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

WineSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WineSkeleton);
