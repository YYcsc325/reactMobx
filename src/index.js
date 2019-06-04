import React from 'react';
import ReactDom from 'react-dom';
import App from './container/App.jsx';
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { Provider } from 'mobx-react';
import '@dep/axios';
import appStore from '@dep/store';
import loadComponent from '@dep/router/loadable';
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();
const Store = { appStore };
//全局路由跳转对象
window.appHistory = history;

//登录页面
const Login = loadComponent(() => import('@con/login/index.component'));

const ProvideRoute = ({component: Component, ...rest}) => {
    return <Route
            {...rest}
            render = {props => {
                return appStore.isAuthority ?  <Component {...props}/> : <Redirect to={{pathname: '/login'}}/>          
            }}
        />
}

const Index = () => {
    return <Provider {...Store}>
        <Router history={history}>
            <Switch>
                <Route path='/login' component={Login}/>
                <ProvideRoute path='/' component={App}/>
            </Switch>
        </Router>
    </Provider>
}

ReactDom.render(<Index />, document.getElementById('root'));

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}