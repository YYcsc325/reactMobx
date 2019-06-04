import React, { Component } from 'react'
import './index.css'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr:[]
        }
    }

    componentWillMount() {
        setTimeout(function(){
            this.setState({
                arr:['我出来了']
            })
        }.bind(this),1000) // 让this指向原处 
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                增加用户
                {
                    this.state.arr.length > 0 
                    ?
                    <div>
                        <ul>
                            {
                                this.state.arr.map(item=>{
                                    return <li>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    :
                    ""
                }
            </div>
        )
    }
}

export default Index