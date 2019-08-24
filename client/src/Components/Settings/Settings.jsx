import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addMenuItem} from '../../actions';
import shortid from 'shortid';

class Settings extends Component {

    state = {
        coffee: [
            "Mocha Latte",
            "Sweet Latte",
            "Vanilla Latte",
            "Americano",
            "Cappuccino",
            "Brewed Coffee",
        ],
        tea: [
            "Cold Brewed Tea",
            "Pineapple Passion Fruit Green Tea",
            "Phoenix Oolong",
            "Jasmine Green Tea",
            "English Black Tea",
        ],
        untouched: true
    }

    componentDidMount () {

    }

    doSomething = (evt) => {
        const {coffee, tea, untouched} = this.state;
        evt.preventDefault();
        if (untouched) {
            coffee.map(item => {
                const uid = shortid.generate();
                const newItem = {
                    currentPrice: "1.00",
                    description: "An amazing blend of smooth and fresh",
                    hotOrIced: "both",
                    name: item,
                    color: '000000',
                    priceHistory: {
                        '2019-08-20' : '1.00',
                    },
                    canSetSweetness: false,
                    canUseAlmondMilk: false,
                    shortName: item.split(' ').reduce((r, c) => `${r}${c.substring(0,1)}`, ''),
                    type: 'coffee',
                }
                this.props.addMenuItem(uid, newItem)
                return null;
            })
            tea.map(item => {
                const uid = shortid.generate();
                const newItem = {
                    currentPrice: "1.00",
                    description: "An amazing blend of smooth and fresh",
                    hotOrIced: "both",
                    name: item,
                    color: '000000',
                    priceHistory: {
                        '2019-08-20' : '1.00',
                    },
                    canSetSweetness: false,
                    canUseAlmondMilk: false,
                    shortName: item.split(' ').reduce((r, c) => `${r}${c.substring(0,1)}`, ''),
                    type: 'tea',
                }
                this.props.addMenuItem(uid, newItem)
                return null;
            })
            this.setState({untouched: false})
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.doSomething}>TADA</button>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, menu }) => {
  return {
    auth,
    menu,
  };
};

export default connect(mapStateToProps, {addMenuItem})(Settings);
