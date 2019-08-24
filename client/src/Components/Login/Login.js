import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions";
import logo from '../../img/ancc_full.png';

class Login extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.history.push('/home')
    }
  }

  render() {
    const { signIn } = this.props;
    return (
      <div className="login">
        <div className="login__container">
            <div className="login__imgContainer">
                <img src={logo} className="login__logo" alt="all nations community church"/>
            </div>
            <div className="login__login">
                <div className="login__buttons">
                    <div className="login__header">
                        <h1 className="login__title">Resolve Coffee App</h1>
                        <p className="login__description">
                            Something amazing is brewing...
                        </p>
                    </div>
                    <button className="login__googleBtn" onClick={(google)=>signIn('GOOGLE')}>
                        Login with Google
                    </button>
                    <div className="login__links">
                        <p>&copy;2019 joonsub.com All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Login);
