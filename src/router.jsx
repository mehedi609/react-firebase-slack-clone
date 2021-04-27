import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import App from './component/App';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import { _firebase } from './config/firebase';
import { clearUser, setUser } from './actions/userActions';
import { connect } from 'react-redux';
import Spinner from './Spinner';

class Router extends Component {
  componentDidMount() {
    _firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = (state) => ({
  isLoading: state.user.isLoading,
});

export default withRouter(
  connect(mapStateFromProps, { setUser, clearUser })(Router)
);
