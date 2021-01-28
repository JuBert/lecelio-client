import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wine3 from '../components/wine/Wine3';
import StaticProfile from '../components/profile/StaticProfile';
import WineSkeleton2 from '../util/WineSkeleton2';
import ProfileSkeleton2 from '../util/ProfileSkeleton2';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
//Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    wineIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const wineId = this.props.match.params.wineId;

    if (wineId) this.setState({ wineIdParam: wineId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { wines, loading } = this.props.data;
    const { wineIdParam } = this.state;
    const winesMarkup = loading ? (
      <WineSkeleton2 />
    ) : wines === null ? (
      <p>No bottles from this user</p>
    ) : !wineIdParam ? (
      wines.map((wine) => (
        <Grid item key={wine.wineId} md={4} sm={6} xs={12}>
          <Wine3 key={wine.wineId} wine={wine} />
        </Grid>
      ))
    ) : (
      wines.map((wine) => {
        if (wine.wineId !== wineIdParam)
          return (
            <Grid item md={4} sm={6} xs={12}>
              <Wine3 key={wine.wineId} wine={wine} />
            </Grid>
          );
        else
          return (
            <Grid item md={4} sm={6} xs={12}>
              <Wine3 key={wine.wineId} wine={wine} openDialog />
            </Grid>
          );
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton2 />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={12}>
          <Grid container spacing={2}>
            {winesMarkup}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
