import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.content = this.content.bind(this)
    };
    onSubmit(event){
        event.preventDefault();
        if (this.state.email === 'max@test.com' && this.state.password === '12345') {
            document.querySelector('.error_message').innerHTML = '';
            this.props.changeState({authorized: true} );
        } else {
            document.querySelector('.error_message').innerHTML = 'неверное имя пользователя или пароль';
        }
    };
    onPasswordChange(event){
        this.setState({password: event.target.value});
    };

    onLoginChange(event) {
        this.setState({email: event.target.value});
    };
    content () {
        if (!this.props.authorized) {
            return (
                <div className='container'>
                    <form >
                    <span><label> email: <input type="email" name="email" value={this.state.email}
                                                onChange={this.onLoginChange}/></label></span>
                        <span><label> Пароль: <input type="password" name="password" value={this.state.password}
                                                     onChange={this.onPasswordChange}/></label></span>
                        <div>
                            <button className='btn_green' onClick={this.onSubmit}>Ok</button>
                            <span className='error_message'/>
                        </div>
                    </form>
                </div>
            );
        } else {
            return <Redirect to="/profile" />
        }
    }
    render() {
        {
           return this.content()
        }
    }
}


export default Login

