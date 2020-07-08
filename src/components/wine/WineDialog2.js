import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//MUI icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
// Redux stuff
import { connect } from 'react-redux';
import {
  getWine,
  clearErrors,
  uploadWineImage,
} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadStyles,
  wineImage: {
    maxWidth: 150,
    height: 150,
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 15,
  },
  closeButton: {
    marginLeft: 'auto',
  },
  expandButton: {
    marginLeft: 'auto',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBotton: 50,
  },
});

class WineDialog2 extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleImageChange = (event) => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadWineImage(this.props.wineId, formData);
  };
  hanldeEditPicture = () => {
    const fileInput = document.getElementById('wineImageInput');
    fileInput.click();
  };
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, wineId } = this.props;
    const newPath = `/users/${userHandle}/wine/${wineId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getWine(this.props.wineId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      wine: {
        wineId,
        name,
        variant,
        vintage,
        createdAt,
        likeCount,
        commentCount,
        userHandle,
        comments,
        wineImage,
        culture,
        country,
        region,
      },
      UI: { loading },
    } = this.props;

    const displayVariant =
      this.props.wine.variant === '' ? null : (
        <Typography variant="body1" component="p">
          Variant: {variant}
        </Typography>
      );

    const displayVintage =
      this.props.wine.vintage === '' ? null : (
        <Typography variant="body1" component="p">
          Vintage: {vintage}
        </Typography>
      );

    const displayCulture =
      this.props.wine.culture === '' ? null : (
        <Typography variant="body1" component="p">
          Culture: {culture}
        </Typography>
      );

    const displayRegion =
      this.props.wine.region === '' ? null : (
        <Typography variant="body1" component="p">
          Region: {region}
        </Typography>
      );

    const displayCountry =
      this.props.wine.country === '' ? null : (
        <Typography variant="body1" component="p">
          Country: {country}
        </Typography>
      );

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <img src={wineImage} alt="Bottle" className={classes.wineImage} />
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
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1" component="p">
            {name}
          </Typography>
          {displayVariant}
          {displayVintage}
          {displayCulture}
          {displayCountry}
          {displayRegion}
          <LikeButton wineId={wineId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm wineId={wineId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="See more"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="xs"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

WineDialog2.propTypes = {
  getWine: PropTypes.func.isRequired,
  wineId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  wine: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  uploadWineImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wine: state.data.wine,
  UI: state.UI,
});

const mapActionsToProps = {
  getWine,
  clearErrors,
  uploadWineImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(WineDialog2));
