import React, { Component } from 'react';
import {Router, Route} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import News from "./components/News";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Home from "./components/Home";
import Menu from "./components/Menu"

const history = createBrowserHistory();
class App extends Component {
    constructor (props) {
        super (props);
        this.state = {
            authorized: false,
            id: ''
        };
        this.changeStateId=this.changeStateId.bind(this);
        this.exit=this.exit.bind(this)
    }
    componentWillMount() {
        if ( localStorage.getItem("authorized") === 'true' ) {
            this.setState({authorized: true,
            id: 1});
        }
    }
    changeStateId(id) {
        this.setState({
            authorized: true,
            id: id});
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
                              changeStateId={this.changeStateId}
                        />
                    )}/>
                    <Route exact path='/news' component={News}/>
                    <Route exact path='/profile' render={(props) => (
                        <Profile {...props}
                              authorized={this.state.authorized}
                                 id={this.state.id}
                        />
                    )}/>
                </div>
            </Router>
        </div>

    )
  }
}

export default App;