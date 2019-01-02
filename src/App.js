import React, { Component } from 'react';
import {Router, Route} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import News from "./News";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu"

const history = createBrowserHistory();
class App extends Component {
    constructor (props) {
        super (props);
        this.state = {authorized: false};
        this.changeState=this.changeState.bind(this);
        this.exit=this.exit.bind(this)
    }
    componentWillMount() {
        if ( localStorage.getItem("authorized") === 'true' ) {
            this.setState({authorized: true});
        }
    }
    changeState() {
        this.setState({authorized: true});
        localStorage.setItem( 'authorized', 'true' );
    }
    exit (){
        this.setState({authorized: false} );
        localStorage.setItem( 'authorized', 'false' );
    }
    render() {
    return (
        <div>
            <Router history = {history}>
                <div>
                    <Menu
                        authorized={this.state.authorized}
                        exit={this.exit}/>
                    <Route exact path='/' render={(props) => (
                        <Home {...props}
                                 authorized={this.state.authorized}
                        />
                    )}/>
                    <Route exact path='/login' render={(props) => (
                        <Login{...props}
                              authorized={this.state.authorized}
                              changeState={this.changeState}
                        />
                    )}/>
                    <Route exact path='/news' component={News}/>
                    <Route exact path='/profile' render={(props) => (
                        <Profile {...props}
                              authorized={this.state.authorized}
                        />
                    )}/>
                </div>
            </Router>
        </div>

    )
  }
}

export default App;
//
// / - главная
//
// /login - страница ввода логина и пароля
//
// /news - страница с новостями (любая однотипная информация)
//
// /profile - страница с произвольным текстом, недоступная без авторизации