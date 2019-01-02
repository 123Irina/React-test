import React, {Component} from 'react';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {news: null};
        this.ajaxNews=this.ajaxNews.bind(this);
        this.newsBlock=this.newsBlock.bind(this)
    }
    componentWillMount() {
        this.ajaxNews()
    }
    ajaxNews() {
        var requestAddress = 'https://mysterious-reef-29460.herokuapp.com/api/v1/news',
            result,
            xhr = new XMLHttpRequest();
        xhr.open('GET', requestAddress, false);
        xhr.send();
        result = JSON.parse(xhr.responseText);
        this.setState( {news: result.data.slice()} )
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
        } else return null
    }
    render() {
        return (
            <div className='container'>
                <h2>Новости</h2>
                {this.newsBlock()}
                <div className='count'>Всего новостей: &nbsp;{this.state.news.length}</div>
            </div>
        )
    }
}

export default News;