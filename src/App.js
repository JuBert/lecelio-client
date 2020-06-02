import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6200ea',
      light: '#8133ee',
      dark: '#4400a3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffab00',
      light: '#ffbb33',
      dark: '#b27700',
      contrastText: '#fff',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemProvider>
    );
  }
}

export default App;
