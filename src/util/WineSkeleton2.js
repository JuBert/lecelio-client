import React, { Fragment } from 'react';
// import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    margin: 7,
  },
  cardContent: {
    // width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    margin: 10,
  },
});

const WineSkeleton2 = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card key={index} className={classes.card}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width={240}
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      ></CardHeader>
      <CardContent className={classes.cardContent}>
        <Skeleton
          animation="wave"
          variant="rect"
          height={300}
          style={{ marginBottom: 18 }}
        />
        <Skeleton
          animation="wave"
          height={10}
          width="70%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={10}
          width="50%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={10}
          width="40%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={10}
          width="40%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={10}
          width="20%"
          style={{ marginBottom: 18 }}
        />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

WineSkeleton2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WineSkeleton2);
