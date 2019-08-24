import React, { Component } from 'react'

export default class TaskItem extends Component {
    getContrastYIQ = (hexcolor) => {
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }
    render() {
        const {option, name, shortName, quantity, color} = this.props;
        const {sweetLevel, useAlmondMilk, useIce} = option;
        const styleObj = {
            backgroundColor: `#${color}`,
            color: this.getContrastYIQ(`${color}`)
        }
        return (
            <div className="taskItem">
                <div className="taskItem__container">
                    <div className="taskItem__header">
                        {   quantity > 1 &&
                            <span className="taskItem__quantity">{quantity}x</span>
                        }
                        <span className="taskItem__color" style={styleObj}>{shortName}</span>
                        <span className="taskItem__name">{!!useIce ? 'Iced' : ''} {name}</span>
                    </div>
                    <div className="taskItem__options">
                        {!!sweetLevel
                            ? <div className="taskItem__option">{sweetLevel}% Sweet</div>
                            : ''
                        }
                        {!!useAlmondMilk
                            ? <div className="taskItem__option">Alm milk</div>
                            : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
