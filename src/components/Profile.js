import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import API from "../constants/api";
import socialSrc from "../constants/social";
import Errors from "../constants/errors";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            error: '',
            contentReady: false
        };
        this.showProfile=this.showProfile.bind(this)
    }
    componentDidMount() {
        let ID = this.props.id;
        axios.get(`${API}/user-info/${ID}.json`)
            .then(res => {
                if(res.data.status === "err") {
                    this.setState({error: Errors[res.data.message]});
                    this.timer = setTimeout(() => {
                        this.setState({contentReady: true})
                    }, 500);
                }
                else {
                    const profile = res.data.data;
                    this.setState({profile: profile});
                    this.timer = setTimeout(() => {
                        this.setState({contentReady: true})
                    }, 500);
                }
            })

    };
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    showProfile() {
        if (this.props.authorized) {
            if(!this.state.error) {
                const languages = this.state.profile.languages;
                const social = this.state.profile.social;
                return (
                    <div className='container'>
                        <h2>Профиль</h2>
                        <p className='items'>Город: {" " + this.state.profile.city}</p>
                        <p>Зания языков:</p>

                        <div className='items' >{languages.map((item, index) => {
                            return (
                                <div key={index}>
                                    {'+ ' + item}
                                </div>
                            )
                        })}</div>
                        <p>Ссылки:</p>
                        <div className='items' >{social.map((item) => {
                            return (
                                <a key={item.label}
                                   href={item.link}
                                   target='_blank'
                                   className='links'
                                   rel="noopener noreferrer">
                                    <img
                                        src={socialSrc[item.label]}
                                        alt={item.label}
                                        height="35" width="35"
                                    />
                                </a>
                            )
                        })}
                        </div>

                    </div>
                )
            } else return <div>{this.state.error}</div>

        } else return <Redirect to="/" />
    }

    render() {
        if (this.state.contentReady) return this.showProfile();
        else return <Loader/>
    }
}

export default Profile;

