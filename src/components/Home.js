import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Home extends Component {
    render() {
        if (this.props.authorized) {
        return <div className='container'>
            <p>Вы авторизованы.</p>
            <p>Можете посмотреть свой &nbsp;
                <Link to="/profile"><span className='link'>Профиль</span></Link>
            </p>

        </div>
        } else {
            return <div className='container'>
                <p>Вы не авторизованы</p>
                <p>Для авторизации нажмите &nbsp;&nbsp;
                    <Link to="/login" className='admin'><span className='link'>Войти</span></Link>
                </p>
            </div>
        }
    }
}

export default Home;