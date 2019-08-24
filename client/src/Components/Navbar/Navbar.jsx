import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import home from '../../img/sharp-home-24px.svg';
import add from '../../img/sharp-add_circle_outline-24px.svg';
import money from '../../img/sharp-attach_money-24px.svg';
import queue from '../../img/sharp-query_builder-24px.svg';

const NavBarItem = props => {
    //this.props.location.pathname.indexOf('order')
    const {url, img, isActive} = props;
    const modifiedClassName = `navbar__item ${isActive ? 'navbar__item--active' : ''}`
    return (
        <li className={modifiedClassName}>
            <Link className="navbar__link" to={`/${url}`}>
                <img className="navbar__icon" src={img} alt={url}/>
                <div className="navbar__text">{url}</div>
            </Link>
        </li>
    )
}


export default class Navbar extends Component {

    state = {
        links: [
            {url: 'home', img: home},
            {url: 'order', img: add},
            {url: 'queue', img: queue},
            {url: 'report', img: money},
        ]
    }

    render() {
        const {pathname} = this.props.location;
        const {links} = this.state;

        // hide on main login screen;
        if (pathname === '/') return null;

        return (
            <div className="navbar">
                
                <div className="navbar__container">
                    <ul className="navbar__links">
                        {
                            links.map(link=>{
                                const isActive = pathname.indexOf(link.url) >= 0;
                                return <NavBarItem key={link.url} {...link} isActive={isActive} />
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
