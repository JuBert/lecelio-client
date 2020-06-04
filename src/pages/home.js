import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Wine from '../components/Wine';
import Profile from '../components/Profile';
class home extends Component {
  state = {
    wines: null,
  };
  componentDidMount() {
    axios
      .get('/getWines')
      .then((res) => {
        console.log(res.data);
        this.setState({
          wines: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let recentWinesMarkup = this.state.wines ? (
      this.state.wines.map((wine) => <Wine key={wine.wineId} wine={wine} />)
    ) : (
      <p>Loading...</p>
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

export default home;
