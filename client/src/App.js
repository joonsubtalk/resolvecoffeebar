import React, {Component} from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchUser} from './actions';
import requireAuth from './Components/Auth/requireAuth';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Order from './Components/Order/Order';
import Queue from './Components/Queue/Queue';
import Settings from './Components/Settings/Settings';
import Navbar from './Components/Navbar/Navbar';

const NavWithRouter = withRouter(Navbar);

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <div className="app__container">
                        <NavWithRouter />
                        <Route exact path='/home' component={requireAuth(Home)} />
                        <Route exact path='/queue' component={Queue} />
                        <Route exact path='/order' component={(Order)} />
                        <Route exact path='/settings' component={requireAuth(Settings)} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/' component={Login} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
      auth
    };
  };

export default connect(mapStateToProps, {fetchUser})(App);
