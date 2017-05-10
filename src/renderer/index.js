import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.css'
import Main from './components/main'

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={enUS}>
                <Main/>
            </LocaleProvider>)
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))