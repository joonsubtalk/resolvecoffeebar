import React, { Component } from 'react';
import {connect} from 'react-redux';
import Drink from '../Drink/Drink';
import Option from '../Option/Option';
import {setMenuItemType, setMenuItem, setMenuItemOption, addCurrentOrderToCart} from '../../actions';
import coffeeIcon from '../../img/coffeeIcon.svg';
import teaIcon from '../../img/teaIcon.svg';
import iced from '../../img/ice.svg';
import sugar from '../../img/sugar.svg';
import noSugar from '../../img/nosugar.svg';
import almondMilk from '../../img/milk.svg';

class Menu extends Component {

    // state = {
    //     menuList: [],
    // }

    // static getDerivedStateFromProps(props, state) {
    //     const {menu} = props;
    //     if (!(Object.entries(menu).length === 0 && menu.constructor === Object)) {
    //         return {menuList: Object.keys(menu).map(key => ({ key, value: menu[key] }))}
    //     }
    //     return null;
    // }

    beverageClickHandler = (evt) => {
        const menuItemType = evt.currentTarget.dataset.menuItemType;
        this.props.setMenuItemType({type: menuItemType, item: '', option: ''});
    }

    itemClickHandler = (evt) => {
        const menuItem = evt.currentTarget.dataset.menuItem;
        this.props.setMenuItem({item: menuItem, option: ''});
    }

    optionHandler = (evt) => {
        const {order:{option}} = this.props;
        const optionType = evt.currentTarget.dataset.optionType;
        const newOption = Object.assign({}, option, {
            [optionType]: option && option[optionType] === true ? false  : true
        });
        this.props.setMenuItemOption({option: newOption});
    }

    multiOptionHandler = (evt) => {
        const {order:{option}} = this.props;
        const optionType = evt.currentTarget.dataset.optionType;
        const optionAmt = evt.currentTarget.dataset.optionAmount;
        const newOption = Object.assign({}, option, {
            [optionType]: option && option[optionType] === optionAmt ? undefined : optionAmt
        });
        this.props.setMenuItemOption({option: newOption});
    }

    addToCart = () => {
        const {order, cart} = this.props;
        const singleOrder = Object.assign({}, order, {quantity: 1})
        const newCart = [...cart, singleOrder];
        this.props.addCurrentOrderToCart(newCart);
    }

    render() {
        // const {menuList} = this.state;
        const {order, menu, payment} = this.props;
        const {type, item} = order;

        const isFree = payment && payment.method && payment.method === 'free'

        const isItemTypeActive = !!type === false
            ? true
            : false;

        const isDrinkActive = !isItemTypeActive && !(item === '0' || !!item)
            ? true
            : false;

        const modifiedItemTypeStepClass = isItemTypeActive
            ? 'menu__step menu__step--active'
            : 'menu__step'

        const modifiedDrinkStepClass = isDrinkActive
            ? 'menu__step menu__step--active'
            : 'menu__step'

        const modifiedOptionStepClass = !isDrinkActive && !isItemTypeActive
            ? 'menu__step menu__step--active'
            : 'menu__step'

        return (
            <div className="menu">
                <div className="menu__container">
                    <div className={modifiedItemTypeStepClass}>
                        <div className="menu__header">
                            {isItemTypeActive ? 'Choose a Beverage' : type}
                        </div>
                        <button className={`menu__menuItem ${ !isItemTypeActive && type==='coffee'? 'menu__menuItem--selected':''}`} onClick={this.beverageClickHandler} data-menu-item-type='coffee'>
                            <img src={coffeeIcon} className="menu__menuItemIcon" alt='coffee' />
                        </button>
                        <button className={`menu__menuItem ${ !isItemTypeActive && type==='tea'? 'menu__menuItem--selected':''}`} onClick={this.beverageClickHandler} data-menu-item-type='tea'>
                            <img src={teaIcon} className="menu__menuItemIcon" alt='tea' />
                        </button>
                    </div>
                    <div className={modifiedDrinkStepClass}>
                        { !isItemTypeActive &&
                            <div className="menu__header">
                                {isDrinkActive ? `Choose a ${type}` : `${menu[Number(item)] && menu[Number(item)].name}`}
                            </div>
                        }
                        {
                            menu && menu.length > 0 &&
                            menu.map((item, idx) => {
                                return item && item.type === type
                                    ? <Drink key={item.id}
                                        {...item}
                                        id={idx}
                                        isFree={isFree}
                                        isSelected={ order.item !== '' && Number(order.item) === idx}
                                        isCondensed={!isDrinkActive}
                                        clickHandler={this.itemClickHandler} />
                                    : null;
                            })
                        }
                    </div>
                    <div className={modifiedOptionStepClass}>
                        {
                            !isDrinkActive && !isItemTypeActive &&
                            <div className="menu__header">
                                Any Options?
                            </div>
                        }
                        {
                            order.item && menu[order.item] && menu[order.item].hotOrIced === 'both' &&
                            <Option prompt={'Iced?'} imgSrc={iced} clickHandler={this.optionHandler} isActive={!!order.option.useIce} type="useIce"/>
                        }
                        {
                            order.item && menu[order.item] && menu[order.item].canSetSweetness &&
                            <div className="menu__multi">
                                <button className={`menu__option ${order.option && !isNaN(order.option.sweetLevel) && Number(order.option && order.option.sweetLevel) === 0 ? 'menu__option--isActive' : ''}`} onClick={this.multiOptionHandler} data-option-type="sweetLevel" data-option-amount="0" >
                                    <div className="menu__optionIcon">
                                        <img className="menu__optionImg" src={noSugar} alt="no sugar" />
                                    </div>
                                    <div className="menu_optionDescription">
                                        no sweet
                                    </div>
                                </button>
                                <button className={`menu__option ${Number(order.option && order.option.sweetLevel) === 50 ? 'menu__option--isActive' : ''}`} onClick={this.multiOptionHandler} data-option-type="sweetLevel" data-option-amount="50" >
                                    <div className="menu__optionIcon">
                                        <img className="menu__optionImg" src={sugar} alt="half sugar" />
                                    </div>
                                    <div className="menu_optionDescription">
                                        half sweet
                                    </div>
                                </button>
                            </div>
                        }
                        {
                            order.item && menu[order.item] && menu[order.item].canUseAlmondMilk &&
                            <Option prompt={'Use Almond Milk?'} imgSrc={almondMilk} description={'adds +$1.00'} isActive={!!order.option.useAlmondMilk} clickHandler={this.optionHandler} type="useAlmondMilk"/>
                        }
                        {
                            order.item && 
                            (
                                <button className="menu__addToOrder" onClick={this.addToCart}>Add to Order</button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, menu, order, cart, payment }) => {
  return {
    auth,
    menu,
    order,
    cart,
    payment,
  };
};

export default connect(mapStateToProps, {setMenuItemType, setMenuItem, setMenuItemOption, addCurrentOrderToCart})(Menu);
