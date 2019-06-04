import React, { Component } from 'react'
import './index.less';
import {Button} from 'antd';
import {observer, inject} from 'mobx-react'

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            needX:0,
            needY:0
        }
        this.disX = 0;   // 设置私有属性
        this.disY = 0;
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    onLogin = () => {
        this.props.appStore.setIsAuthority(true)
        // console.log( this.props, 'this.props' )
        // window.appHistory.push('/')
        this.props.history.push('/')
    }
   // 拖拽开始 down
   fnDown( e ){
        this.disX = e.clientX - e.target.offsetLeft;
        this.disY = e.clientY - e.target.offsetTop;
        document.onmousemove = this.fnMove.bind(this);
        document.onmouseup = this.fnUp.bind(this);
    }
    // 拖拽移动 move
    fnMove( e ){
        this.setState({
            needX:e.clientX - this.disX,
            needY:e.clientY - this.disY
        })
    }
    // 拖拽放下 end
    fnUp( e ){
        document.onmousemove = null;
        document.onmouseup = null;
    }
    render() {
        console.log(this.state.needX)
        console.log(this.state.needY)
        return (
            <div className='main'>
                <div
                  className='drag'
                  style = {{left:this.state.needX,top:this.state.needY}}
                  onMouseDown = {this.fnDown.bind(this)}
                ></div>
                <div className='login'>
                    登陆页
                    <Button
                        onClick={this.onLogin}
                    >
                        点击登录
                    </Button>
                </div>
            </div>
        )
    }
}


export default Index