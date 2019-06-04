import React from 'react';//需引入react来解析jsx

export function person( props ){
    const { name, myClick, changed } = props
    return <div className = "Person">
               <p>{ name }</p>
               <input stype = "text" onChange = { changed } />
               <button onClick = { myClick }>父组件事件</button>
           </div>
}

export function show( name,props ){
     return <span { ...props }>
         { name }
     </span>
}