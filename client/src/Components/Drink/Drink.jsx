import React, { Component } from 'react';
import currency from 'currency.js';

export default class Drink extends Component {


    getContrastYIQ = (hexcolor) => {
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    render() {
        const {currentPrice, description, name, shortName, color, id, clickHandler, isCondensed, isSelected, isFree} = this.props;

        const styleObj = {
            backgroundColor: `#${color}`,
            color: this.getContrastYIQ(`${color}`)
        }
        const modifiedClassName= isCondensed
            ? 'drink drink--condensed'
            : 'drink'

        const infoStyleObj = isSelected
            ? styleObj
            : {}

        return (
            <button className={modifiedClassName} onClick={clickHandler} data-menu-item={id}>
                <div className="drink__container">
                    <div className="drink__initials" style={styleObj}>
                        <div>{shortName}</div>
                    </div>
                    <div className="drink__info" style={infoStyleObj}>
                        <div className="drink__header">
                            <span className="drink__title">{name}</span>
                            { !isCondensed &&
                                <span className="drink__price">${isFree ? `${currency(0)}` : currentPrice}</span>
                            }
                        </div>
                        { !isCondensed &&
                            <div className="drink__description">
                                {description}
                            </div>
                        }
                    </div>
                </div>
            </button>
        )
    }
}
