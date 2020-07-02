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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// MUI icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Redux stuff
import { connect } from 'react-redux';
import {
  postWine,
  clearErrors,
  uploadWineImage,
} from '../../redux/actions/dataActions';

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
    marginLeft: 'auto',
  },
  formControl: {
    minWidth: 120,
  },
});

class PostWine2 extends Component {
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
              <FormControl className={classes.formControl}>
                <InputLabel>Variant</InputLabel>
                <Select
                  label="Wine Type"
                  name="variant"
                  value={this.state.variant}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="Italy">Rosé</MenuItem>
                  <MenuItem value="sparkling">Sparkling</MenuItem>
                  <MenuItem value="white">White</MenuItem>
                </Select>
              </FormControl>
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
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  label="Country"
                  name="country"
                  id="demo-simple-select"
                  value={this.state.country}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Italy">Italy</MenuItem>
                  <MenuItem value="Italy">New Zealand</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="Spain">Spain</MenuItem>
                  <MenuItem value="Italy">United States</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="region"
                type="text"
                label="Region"
                placeholder="Alsace"
                className={classes.TextField}
                value={this.state.region}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <FormControl className={classes.formControl}>
                <InputLabel>Culture</InputLabel>
                <Select
                  label="Culture"
                  name="culture"
                  value={this.state.culture}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="conventional">Conventional</MenuItem>
                  <MenuItem value="natural">Natural</MenuItem>
                  <MenuItem value="sparkling">Biodynamic</MenuItem>
                  <MenuItem value="organic">Organic</MenuItem>
                </Select>
              </FormControl>
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

PostWine2.propTypes = {
  postWine: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, {
  postWine,
  clearErrors,
})(withStyles(styles)(PostWine2));
