import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux stuff
import { connect } from 'react-redux';
import { likeWine, unlikeWine } from '../../redux/actions/dataActions';

class LikeButton extends Component {
  likedWine = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.wineId === this.props.wineId)
    )
      return true;
    else return false;
  };
  likeWine = () => {
    this.props.likeWine(this.props.wineId);
  };
  unlikeWine = () => {
    this.props.unlikeWine(this.props.wineId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedWine() ? (
      <MyButton tip="Unlike" onClick={this.unlikeWine}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeWine}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  wineId: PropTypes.string.isRequired,
  likeWine: PropTypes.func.isRequired,
  unlikeWine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeWine,
  unlikeWine,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
