import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.exit=this.exit.bind(this)
    }
    exit () {
        this.props.exit({authorized: false})
    }
    authorized() {
        return (
            <ul className='menu'>
                <li><Link to="/">На главную</Link></li>
                <li><Link to="/news">Новости</Link></li>
                <li><button className='admin' onClick={this.exit}>Выйти</button></li>
            </ul>
        )
    }

    noAuthorized() {
        return (
            <ul className='menu'>
                <li><Link to="/">На главную</Link></li>
                <li><Link to="/news">Новости</Link></li>
                <li><Link to="/login" className='admin'>Войти</Link></li>
            </ul>
        )
    }
    render() {
        if (this.props.authorized) {
            return this.authorized()
        } else return this.noAuthorized()
    }
}

export default Menu