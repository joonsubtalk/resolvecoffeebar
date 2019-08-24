import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions';

class Home extends Component {

    render() {

        return (
            <div className="home">
                <div className="home__container">
                    <div className="">
                        <button onClick={this.props.signOut}>logout</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(null, {signOut})(Home);
