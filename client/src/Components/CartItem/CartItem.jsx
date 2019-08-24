import React, { Component } from 'react';
import clear from '../../img/baseline-clear-24px.svg';
import edit from '../../img/baseline-edit-24px.svg';
import add from '../../img/baseline-add-24px.svg';
import subtract from '../../img/subtract.svg';
import currency from 'currency.js';

export default class CartItem extends Component {

    state = {
        isActive: false,
    }

    clickHandler = () => {
        this.setState((prevState, props) => ({
            isActive: !prevState.isActive
        })); 
    }

    render() {
        const {
            itemObj:{ currentPrice, name},
            option:{useAlmondMilk, useIce, sweetLevel},
            modifyHandler,
            removeHandler,
            addHandler,
            subHandler,
            quantity,
            isFree,
        } = this.props;
        const {isActive} = this.state;
        return (
            <div className="cartItem" onClick={this.clickHandler}>
                <div className="cartItem__container">
                    <div className="cartItem__header">
                        <div className="cartItem__count">{quantity}x</div>
                        <div className="cartItem__name">{name}</div>
                        <div className="cartItem__price"></div>
                        {
                            isFree
                            ? <div className="cartItem__finalPrice">{`$${currency(0)}`}</div>
                            : <div className="cartItem__finalPrice">{useAlmondMilk ? `$${currency(currentPrice).add(1).multiply(quantity)}` : `$${currency(currentPrice).multiply(quantity)}`}</div>
                        }
                    </div>
                    <div className="cartItem__options">
                        {useAlmondMilk &&
                        <div className="cartItem__item">
                            <div className="cartItem__optionName">almond milk</div>
                            {
                                isFree
                                ? <div className="cartItem__optionPrice">{`$${currency(0)}`}</div>
                                : <div className="cartItem__optionPrice">{`$${currency(1).multiply(quantity)}`}</div>
                            }
                        </div>
                        }
                        {useIce &&
                        <div className="cartItem__item">
                            <div className="cartItem__optionName">iced</div>
                            <div className="cartItem__optionPrice"></div>
                        </div>
                        }
                        {sweetLevel &&
                        <div className="cartItem__item">
                            <div className="cartItem__optionName">{sweetLevel}% sweet</div>
                            <div className="cartItem__optionPrice"></div>
                        </div>
                        }
                    </div>
                    {
                        isActive &&
                        <div className="cartItem__actions">
                            <div className="cartItem__action" onClick={addHandler}>
                                <img className="cartItem__icon" src={add} alt="add order"/> Add
                            </div>
                            <div className="cartItem__action" onClick={modifyHandler}>
                                <img className="cartItem__icon" src={edit} alt="edit order"/> Modify
                            </div>
                            <div className="cartItem__action" onClick={quantity > 1 ? subHandler : removeHandler}>
                                <img className="cartItem__icon" src={quantity > 1 ? subtract : clear} alt="remove order"/> {quantity > 1 ? 'Substract 1' : 'Remove Oder'}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
