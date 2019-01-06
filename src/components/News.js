import React, {Component} from 'react';
import Loader from "./Loader";
import API from "../constants/api";
import axios from "axios";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {news: null,
            contentReady: false};
        this.newsBlock=this.newsBlock.bind(this)
    }
    componentWillMount() {
        axios.get(`${API}/news`)
            .then(result => {
                this.setState( {news: result.data.data.slice()} );
                this.timer = setTimeout(() => {
                            this.setState({contentReady: true})
                        }, 500)
            })
            .catch (error => {console.log('error')})

    };
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    newsBlock () {
        if (this.state.news.length) {
            return this.state.news.map(item => {
                return (
                        <div className='news' key={item.id} data-id={item.id}>
                            <h3>{item.title}</h3>
                            <p className='news_text'>{item.text}</p>
                        </div>
                )
            })
        } else return <div className='container'>
            <span>Сервер не доступен</span>
        </div>
    }
    render() {
        if(this.state.contentReady) {
            return (
                <div className='container'>
                    <h2>Новости</h2>
                    {this.newsBlock()}
                    <div className='count'>Всего новостей: &nbsp;{this.state.news.length}</div>
                </div>
            )
        } else return <Loader/>
    }
}

export default News;