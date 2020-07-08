import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// MUI icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postWine, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadStyles,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 15,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '85%',
    marginTop: 5,
  },
  formControl: {
    minWidth: 120,
  },
});

class PostWine extends Component {
  state = {
    open: false,
    name: '',
    vintage: '',
    variant: '',
    culture: '',
    country: '',
    region: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        name: '',
        variant: '',
        vintage: '',
        culture: '',
        country: '',
        region: '',
        open: false,
        errors: {},
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postWine({
      name: this.state.name,
      variant: this.state.variant,
      vintage: this.state.vintage,
      culture: this.state.culture,
      country: this.state.country,
      region: this.state.region,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Wine">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWitdh
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Bottle</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="name"
                type="text"
                label="Bottle name"
                placeholder="Laurus 2015"
                error={errors.name ? true : false}
                helperText={errors.name}
                className={classes.TextField}
                value={this.state.name}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="variant"
                type="text"
                label="Wine Type"
                placeholder="White / Red / Rosé / Sparkly"
                className={classes.TextField}
                value={this.state.variant}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="vintage"
                type="text"
                label="Vintage"
                placeholder="2015"
                className={classes.TextField}
                value={this.state.vintage}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="culture"
                type="text"
                label="Culture"
                placeholder="Conventionnelle"
                className={classes.TextField}
                value={this.state.culture}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="country"
                type="text"
                label="Country"
                placeholder="FR"
                className={classes.TextField}
                value={this.state.country}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="region"
                type="text"
                label="Region"
                placeholder="Alsace"
                className={classes.TextField}
                value={this.state.alsace}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostWine.propTypes = {
  postWine: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postWine, clearErrors })(
  withStyles(styles)(PostWine)
);
