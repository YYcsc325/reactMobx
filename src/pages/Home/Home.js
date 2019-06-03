import React, {Component} from 'react';
import { DatePicker,Button } from 'antd';
import state from './index.state.js';
import { observer } from 'mobx-react';

@observer    // 装饰器需要配置jsconfig.json
class Home extends Component {
    onclick = () => {
        state.setUpload();
    }
    render() {
        return (
            <div>
                <span>this is home ~hi xht</span>
                <span>{state.upload}</span>
                <Button onClick = { this.onclick.bind(this) }>点击数据</Button>
                <DatePicker />
            </div>
        )
    }
}
export default Home;