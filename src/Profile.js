import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {profile: null};
        this.ajaxProfile=this.ajaxProfile.bind(this);
        // this.newsBlock=this.newsBlock.bind(this)
    }
    componentWillMount() {
        this.ajaxProfile()
    }
    ajaxProfile() {
        var requestAddress = 'https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/1',
            result,
            xhr = new XMLHttpRequest();
        xhr.open('GET', requestAddress, false);
        xhr.send();
        result = JSON.parse(xhr.responseText);
        this.setState( {profile: result.data} )
    }
    render() {
    const languages = this.state.profile.languages;
    const social = this.state.profile.social;
    const socialSrc = {
        vk: './icon/vk.ico',
        telegram: './icon/telegram.svg',
        web: './icon/Web.ico',
        youtube: './icon/youtube.ico',
        twitter: './icon/twitter.ico',
        twitch: './icon/twitch.svg'
    };
        if (this.props.authorized) {
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
                        <div className='items' >{social.map((item, index) => {
                            return (
                                    <a key={index}
                                       href={item.link}
                                       target='_blank'
                                        className='links' >
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
        } else return <Redirect to="/home" />
    }
}

export default Profile;

// city: "Москва"
// languages: (2) ["English", "Русский"]
// social: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// userId: 1