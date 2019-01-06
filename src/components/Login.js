import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import API from "../constants/api";
import Errors from "../constants/errors";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.content = this.content.bind(this)
    };
    onSubmit(event){
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        axios.post(`${API}/validate`, {email, password})
            .then(({ data }) => {
                if (data.status === "err") {
                    this.setState({
                        error: Errors[data.message],
                        password: ''
                    });

                } else {
                    this.props.changeState({authorized: true} );
                    this.props.changeStateId(data.data.id);
                }
            });
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
                            <span className='error_message'>{this.state.error}</span>
                        </div>
                    </form>
                </div>
            );
        } else {
            return <Redirect to="/profile" />
        }
    }
    render() {
        return this.content()
    }
}

export default Login;



