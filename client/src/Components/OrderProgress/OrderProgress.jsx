import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setPaymentInfo} from '../../actions';
import flag from '../../img/sharp-outlined_flag-24px.svg';

class OrderProgress extends Component {

    inputNameHandler = evt => {
        const {payment} = this.props;
        const payerObj = {
            payer: evt.target.value
        }
        const paymentObj = Object.assign({}, payment, payerObj);
        this.props.setPaymentInfo(paymentObj);
    }

    priorityHandler = evt => {
        const {payment} = this.props;
        const payerObj = {
            isHighPriority: payment.isHighPriority ? false : true,
        }
        const paymentObj = Object.assign({}, payment, payerObj);
        this.props.setPaymentInfo(paymentObj);
    }

    render() {
        const {payer, isHighPriority} = this.props.payment;
        const showHighPriorityStyle = isHighPriority || false;
        return (
            <div className="orderProgress">
                <div className="orderProgress__container">
                    <div className="orderProgress__wrapper">
                        <div className="orderProgress__subHeader">
                            Customer's Name:
                        </div>
                        <form className="orderProgress__form" onSubmit={(e)=>{e.preventDefault()}}>
                            <input type="text" className="orderProgress__input" onChange={this.inputNameHandler} value={payer ? payer : ''}/>
                        </form>
                    </div>
                    <button className={`orderProgress__wrapper ${showHighPriorityStyle ? 'orderProgress--highPriority' : ''}`} onClick={this.priorityHandler}>
                        <img src={flag} alt="flag order" /> Flag Priority
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ payment }) => {
    return {
      payment,
    };
  };
  
  export default connect(mapStateToProps, {setPaymentInfo})(OrderProgress);
