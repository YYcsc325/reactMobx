import React from 'react'
/**
 * @name 无状态组件
 * @param {} props
 */
const Header = ( props ) =>{   // 传一个对象
    const { title , handletoggle } = props;
    return (
        <div { ...props }>
            <h3>{ title }</h3>
            <button onClick = { handletoggle }>点击触发事件</button>
        </div>
    )
}

export default Header;

// const Footer = (...props) => { 可以一个个传   如 Footer(name,head)
        
// }