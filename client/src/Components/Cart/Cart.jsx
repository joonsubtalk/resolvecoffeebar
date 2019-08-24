import React, { Component } from 'react';
import {connect} from 'react-redux';
import { format } from 'date-fns';
import uuidv4 from 'uuid/v4';
import currency from 'currency.js';
import {modifyOrder, popCart, setPaymentInfo, submitCartOrder, addCurrentOrderToCart} from '../../actions';
import CartItem from '../CartItem/CartItem';
import {TODO} from '../../configs/constants';
import venmo from '../../img/venmo.svg';
import cash from '../../img/dollar.svg';
import free from '../../img/no-money.svg';


class Cart extends Component {

    getTotalCost = () => {
        const {cart, menu} = this.props;
        let total = currency(0);
        cart.forEach(item => {
            if (!(Object.entries(item).length === 0 && item.constructor === Object)) {
                const itemObj = menu[item.item];
                const {currentPrice} = itemObj;
                const {useAlmondMilk} = item.option;
                total = currency(currentPrice).add(useAlmondMilk ? 1 : 0).multiply(item.quantity).add(total)
            }
        })
        return `$${total}`;
    }

    modifyOrderHandler = cartIdx =>{
        const {cart} = this.props;
        const {type, item} = cart[cartIdx];
        const itemOption = cart[cartIdx].option;

        const modifiedOrder = {
            type,
            item,
            option: itemOption,
        }
        this.props.modifyOrder(modifiedOrder);
        const newCart = Array.from(cart);
        const modifiedCart = newCart.filter((el, idx) => {
            return idx !== cartIdx;
        })
        this.props.popCart(modifiedCart);
    }

    setOrderHandler = (cartIdx, amt) => {
        const {order, cart} = this.props;
        const currentQuantity = cart[cartIdx].quantity;
        const modOrder = Object.assign({}, cart[cartIdx], {quantity: currentQuantity + amt})
        const newCart = [...cart];
        newCart[cartIdx] = modOrder;
        this.props.addCurrentOrderToCart(newCart);
    }

    removeOrderHandler = cartIdx => {
        const {cart} = this.props;
        const newCart = Array.from(cart);
        const modifiedCart = newCart.filter((el, idx) => {
            return idx !== cartIdx;
        })
        this.props.popCart(modifiedCart);
    }

    paymentTypeHandler = payType => {
        const {payment} = this.props;
        const payerObj = {
            method: payType
        }
        const paymentObj = Object.assign({}, payment, payerObj);
        this.props.setPaymentInfo(paymentObj);
    }

    submitHandler = evt => {
        evt.preventDefault();

        const {cart, menu, payment} = this.props;

        const timestamp = format(new Date(), 'yyyy-MM-dd::HH:mm:ss');
        const uuid = uuidv4();

        let orderArr = [];
        let totalPrice = 0;
        
        cart.forEach( item => {
            // map it to the menu
            const { name, shortName, currentPrice, color } = menu[Number(item.item)];

            const orderObj = {
                option: item.option,
                name,
                shortName,
                color,
                currentPrice,
                quantity: item.quantity,
                finalPrice: item.option.useAlmondMilk ? `${currency(currentPrice).add(1).multiply(item.quantity)}` : `${currency(currentPrice).multiply(item.quantity)}`,
            };

            totalPrice = currency(totalPrice).add(orderObj.finalPrice);
            orderArr.push(orderObj);
        })

        const orderObj = {
            status: TODO,
            orderSubmitTimestamp: timestamp,
            paymentMethod: payment.method,
            customerName: payment.payer,
            order: orderArr,
            isHighPriority: !!payment.isHighPriority,
            totalPrice: `${currency(totalPrice)}`,
            hasPaid: true, // Assuming all kiosk payments are made upfront
        }
        this.props.submitCartOrder(uuid, orderObj);
    }

    grammarify = name => {
        const temp = name.toLowerCase();
        return temp.charAt(temp.length-1) === 's'
            ? `${name}'`
            : `${name}'s`
    }

    render() {
        const {cart, menu, payment} = this.props;
        const isFree = payment && payment.method && payment.method === 'free';
        const totalCost = isFree
            ? `$${currency(0)}`
            : this.getTotalCost();
        const isCartEmpty = cart && cart.length > 0
            ? false
            : true
        const hasPaymentType = payment && payment.method
            ? true
            : false
        const hasNameForOrder =  payment && payment.payer && payment.payer.length > 0
            ? true
            : false
        const isSubmitable = !isCartEmpty && hasPaymentType && hasNameForOrder;

        const cartTitle = payment && payment.payer
            ? `${this.grammarify(payment.payer)} Order`
            : 'Order Total';

        const longName = cartTitle.length > 19
            ? true
            : false

        return (
            <div className="cart">
                <div className="cart__container">
                    {   payment && payment.isHighPriority &&
                        <div className="cart__priority">Priority</div>
                    }
                    <div className={`${longName ? 'cart__longHeader' : 'cart__header'}`}>
                        {cartTitle}
                    </div>
                    {
                        !isCartEmpty
                        ?
                        (cart.map((item, idx) => {
                            const itemObj = menu[item.item];
                            return <CartItem key={idx} {...item} itemObj={itemObj}
                                isFree={isFree}
                                addHandler={()=>{this.setOrderHandler(idx, 1)}}
                                subHandler={()=>{this.setOrderHandler(idx, -1)}}
                                removeHandler={()=>{this.removeOrderHandler(idx)}}
                                modifyHandler={()=>{this.modifyOrderHandler(idx)}} />
                        }))
                        : <div className="cart__empty">Empty Order</div>
                    }
                    <div className="cart__summary">
                        <div className="cart__total">
                            {
                                totalCost
                            }
                        </div>
                    </div>
                    {
                        !isCartEmpty &&
                        <div className="cart__payment">
                            <div className="cart__subHeader">
                                Payment Type: <span className="cart__method">{payment.method}</span>
                            </div>
                            <div className="cart__paymentType">
                                <div className={`cart__paymentItem ${payment.method=='venmo' ? 'cart__paymentIcon--isActive':''}`}>
                                    <img src={venmo} className="cart__paymentIcon" alt="venmo" onClick={()=>{this.paymentTypeHandler('venmo')}}/>
                                </div>
                                <div className={`cart__paymentItem ${payment.method=='cash' ? 'cart__paymentIcon--isActive':''}`}>
                                    <img src={cash} className="cart__paymentIcon" alt="cash" onClick={()=>{this.paymentTypeHandler('cash')}}/>
                                </div>
                                <div className={`cart__paymentItem ${payment.method=='free' ? 'cart__paymentIcon--isActive':''}`}>
                                    <img src={free} className="cart__paymentIconTall" alt="free" onClick={()=>{this.paymentTypeHandler('free')}}/>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        <div className="cart__action">
                            <button className="cart__submit" disabled={!isSubmitable} type="submit" onClick={this.submitHandler}>Submit {payment && payment.isHighPriority && 'Priority'} {payment && payment.method && payment.method==='free' && 'Free'} Order</button>
                        </div>
                    }
                </div>
                {
                    <div style={{display: 'none'}}>
                    {
                        isCartEmpty && `Need at least one item`
                    }
                    {
                        !hasNameForOrder && `Need Customer's Name`
                    }
                    {
                        !hasPaymentType && `How will they pay?`
                    }
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = ({ cart, menu, order, payment }) => {
    return {
      cart,
      menu,
      order,
      payment,
    };
  };
  
  export default connect(mapStateToProps, {modifyOrder, popCart, setPaymentInfo, submitCartOrder, addCurrentOrderToCart})(Cart);
