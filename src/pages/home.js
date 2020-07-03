import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Wine2 from '../components/wine/Wine2';
import Profile from '../components/profile/Profile';
import WineSkeleton2 from '../util/WineSkeleton2';

import { connect } from 'react-redux';
import { getWines } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getWines();
  }
  render() {
    const { wines, loading } = this.props.data;
    let recentWinesMarkup = !loading ? (
      wines.map((wine) => (
        <Grid item key={wine.wineId} md={4} sm={6} xs={12}>
          <Wine2 key={wine.wineId} wine={wine} />
        </Grid>
      ))
    ) : (
      <WineSkeleton2 />
    );

    return (
      <Grid container spacing={2} justify="center">
        <Grid item sm={12}>
          <Profile />
        </Grid>
        <Grid item sm={12}>
          <Grid container spacing={2} justify="center">
            {recentWinesMarkup}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getWines: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getWines })(home);
