import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import WineDialog2 from './WineDialog2';
import LikeButton from './LikeButton';
import MyButton from '../../util/MyButton';
import { uploadWineImage } from '../../redux/actions/dataActions';
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
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    canvas: true,
    orientation: true,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
};

class Wine3 extends Component {
  handleImageChange = (event) => {
    console.log('handleImageChange console log');
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadWineImage(this.props.wine.wineId, formData);
  };

  hanldeEditPicture = () => {
    console.log('hanldeEditPicture console log' + this.props.wine);
    const fileInput = document.getElementById('wineImageInput');
    fileInput.click();
  };
  render() {
    dayjs.extend(relativeTime);
    // console.log(this.props.wine.wineId);
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
      // user: {
      //   authenticated,
      //   credentials: { handle },
      // },
    } = this.props;

    // const wineImageButton =
    //   authenticated && userHandle === handle ? (
    //     <DeleteWine wineId={wineId} />
    //   ) : null;

    const displayVariant =
      this.props.wine.variant === '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Variant: {variant}
        </Typography>
      );

    const displayVintage =
      this.props.wine.vintage === '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Vintage: {vintage}
        </Typography>
      );

    const displayCulture =
      this.props.wine.culture === '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Culture: {culture}
        </Typography>
      );

    const displayRegion =
      this.props.wine.region === '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Region: {region}
        </Typography>
      );

    const displayCountry =
      this.props.wine.country === '' ? null : (
        <Typography variant="body2" color="textSecondary" component="p">
          Country: {country}
        </Typography>
      );

    return (
      <Card key={wineId} className={classes.root}>
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
        <input
          type="file"
          id="wineImageInput"
          hidden="hidden"
          onChange={this.handleImageChange}
        />
        <MyButton
          tip="Edit wine picture"
          onClick={this.hanldeEditPicture}
          btnClassName="button"
        >
          <EditIcon color="primary" />
        </MyButton>
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

Wine3.propTypes = {
  user: PropTypes.object.isRequired,
  wine: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  uploadWineImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadWineImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Wine3));
