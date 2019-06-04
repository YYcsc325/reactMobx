// 路由
import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
//路由按需加载
import loadComponent from './loadable';

/**
 * webpackChunkName: webpack按需加在打包时的chunk名字
 */

//首页demo组件
const Home = loadComponent(() => import(/* webpackChunkName: "home" */ '@con/home/index.component'));

//用户管理
const UserList = loadComponent(() => import(/* webpackChunkName: "userList" */ '@con/userManager/userList/index.component'));
const AddUser = loadComponent(() => import(/* webpackChunkName: "addUser" */ '@con/userManager/addUser/index.component'));

//文章管理
const ArticleList = loadComponent(() => import(/* webpackChunkName: "articleList" */ '@con/articleManager/articleList/index.component'));
const AddArticle = loadComponent(() => import(/* webpackChunkName: "addArticle" */ '@con/articleManager/addArticle/index.component'));

//404
const NoMatch = loadComponent(() => import(/* webpackChunkName: "404" */ '@con/error/404.component'));

const Index = () => (
    <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/user/list' component={UserList}/>
        <Route path='/user/add' component={AddUser}/>
        <Route path='/article/list' component={ArticleList}/>
        <Route path='/article/add' component={AddArticle}/>
        <Route component={NoMatch}/>
    </Switch>    
);

export default Index;
