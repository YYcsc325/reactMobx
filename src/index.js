// require('./css/style.css');
// require('./css/style.less');

import React from 'react';
import ReactDom from 'react-dom';

// import getRouter from './router/router';
import Home from './pages/Home/Home'

ReactDom.render(<Home/>, document.getElementById('root'));

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
