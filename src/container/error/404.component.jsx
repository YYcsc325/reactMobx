import React, { Component } from 'react'
import { observer } from 'mobx-react';
import State from './index.state';
import { person , show } from '../../utils/component'
import Header from '../../utils/components'

@observer
class Index extends Component {
    constructor(props){    // extends加上constructor   一定要加上super
        super();
        this.state = {
            
        }
    }
    change = data => {
        State.changeQueryData();
    }
    changed = data => {
        console.log('触发了')
    }
    myClick = data => {
        console.log('点击事件触发了')
    }
    handletoggle = () => {
        console.log('handletoggle')
    }
    componentWillMount(){
         
    }
    render() {
        return (
            <div>
                { State.queryData }
                <button onClick = { this.change }>点击一下</button> 
                <Header 
                    handletoggle = { this.handletoggle }
                    title = { 'baby' }//在有状态的组建中，接受父组件传来的数据要加this
                    style = { { color:"pink" } }
                />
                {
                    person({
                        "name":'岑世超',
                        'changed':this.changed,
                        'myClick':this.myClick
                    })
                }
                {
                    show(
                        "洪盛",
                        {
                            "style":{
                                "color":"red",
                                'fontSize':"24px"
                            },
                            "onClick":function(){
                                console.log('我变漂亮了')
                            }
                        }
                    )
                }
            </div>
        )
    }
}
export default Index;