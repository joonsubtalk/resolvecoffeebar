import React, { Component } from 'react'

export default class Option extends Component {

    render() {
        const {prompt, description, clickHandler, imgSrc, type, isActive} = this.props;
        const modifiedClassName = isActive
            ? 'option option--isActive'
            : 'option';
        return (
            <button className={modifiedClassName} onClick={clickHandler} data-option-type={type}>
                <div className="option__container">
                    <div className="option__illustration">
                        <img src={imgSrc} alt="" className="option__img" />
                    </div>
                    <div className="option__info">
                        <div className="option__prompt">
                            {prompt}
                        </div>
                        {
                            description && <div className="option__description">{description}</div>
                        }
                        <div className="option__options">
                            {/* <button className="option__option"
                                onClick={clickHandler}
                                    {option.name}
                            </button> */}
                        </div>
                    </div>
                </div>
            </button>
        )
    }
}
