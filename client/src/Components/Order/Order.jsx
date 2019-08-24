import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMenuItems} from '../../actions';
import Cart from '../Cart/Cart';
import Menu from '../Menu/Menu';
import OrderProgress from '../OrderProgress/OrderProgress';

class Order extends Component {

    componentDidMount() {
        this.props.getMenuItems();
    }

    render() {
        return (
            <div className="order">
                <div className="order__container">
                    <div className="order__row">
                        <OrderProgress />
                    </div>
                    <div className="order__row">
                        <Menu />
                        <Cart />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ menu }) => {
  return {
    menu,
  };
};

export default connect(mapStateToProps, {getMenuItems})(Order);
