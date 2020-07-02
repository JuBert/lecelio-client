import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteWine from './DeleteWine';
import WineDialog2 from './WineDialog2';
import LikeButton from './LikeButton';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// MUI icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 145,
    paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
};

class Wine2 extends Component {
  render() {
    dayjs.extend(relativeTime);
    //console.log(this.props);
    const {
      classes,
      wine: {
        name,
        variant,
        vintage,
        culture,
        country,
        region,
        createdAt,
        userImage,
        userHandle,
        wineId,
        likeCount,
        commentCount,
        wineImage,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteWine wineId={wineId} />
      ) : null;

    const displayVariant =
      this.props.wine.variant == '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Variant: {variant}
        </Typography>
      );

    const displayVintage =
      this.props.wine.vintage == '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Vintage: {vintage}
        </Typography>
      );

    const displayCulture =
      this.props.wine.culture == '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Culture: {culture}
        </Typography>
      );

    const displayRegion =
      this.props.wine.region == '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Region: {region}
        </Typography>
      );

    const displayCountry =
      this.props.wine.country == '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Country: {country}
        </Typography>
      );

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label={userHandle}
              className={classes.avatar}
              src={userImage}
              component={Link}
              to={`/users/${userHandle}`}
            />
          }
          title={name}
          subheader={dayjs(createdAt).fromNow()}
        />
        <CardMedia className={classes.media} image={wineImage} title={name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Name: {name}
          </Typography>

          {displayVariant}

          {displayVintage}

          {displayCulture}

          {displayCountry}

          {displayRegion}
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton wineId={wineId} />
          <span>
            <Typography variant="body2" color="textSecondary" component="p">
              {likeCount} likes
            </Typography>
          </span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <Typography variant="body2" color="textSecondary" component="p">
            <span>{commentCount} comments</span>
          </Typography>
          <WineDialog2
            wineId={wineId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardActions>
      </Card>
    );
  }
}

Wine2.propTypes = {
  user: PropTypes.object.isRequired,
  wine: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Wine2));
