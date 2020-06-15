import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Wine from '../components/wine/Wine';
import Profile from '../components/profile/Profile';
import WineSkeleton from '../util/WineSkeleton';

import { connect } from 'react-redux';
import { getWines } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getWines();
  }
  render() {
    const { wines, loading } = this.props.data;
    let recentWinesMarkup = !loading ? (
      wines.map((wine) => <Wine key={wine.wineId} wine={wine} />)
    ) : (
      <WineSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentWinesMarkup}
        </Grid>
        <Grid item sm={4} xs={false}>
          <Profile />
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
