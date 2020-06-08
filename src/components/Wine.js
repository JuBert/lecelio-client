import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteWine from '../components/DeleteWine';
// Redux stuff
import { connect } from 'react-redux';
import { likeWine, unlikeWine } from '../redux/actions/dataActions';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

class Wine extends Component {
  likedWine = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.wineId === this.props.wine.wineId
      )
    )
      return true;
    else return false;
  };
  likeWine = () => {
    this.props.likeWine(this.props.wine.wineId);
  };
  unlikeWine = () => {
    this.props.unlikeWine(this.props.wine.wineId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      wine: {
        name,
        createdAt,
        userImage,
        userHandle,
        wineId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedWine() ? (
      <MyButton tip="Unlike" onClick={this.unlikeWine}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeWine}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteWine wineId={wineId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {name}
          </Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Wine.propTypes = {
  likeWine: PropTypes.func.isRequired,
  unlikeWine: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  wine: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProp = {
  likeWine,
  unlikeWine,
};

export default connect(
  mapStateToProps,
  mapActionsToProp
)(withStyles(styles)(Wine));
