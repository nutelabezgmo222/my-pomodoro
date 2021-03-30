import React from 'react'

function Toolbar({timers=[], onItemClick=f=>f}) {
  return (
    <div className="toolbar">
      <ul className="toolbar__list">
        {
          timers &&
          timers.map((item, i) => {
            return <li className={item.active?'active': ''} onClick={()=>onItemClick(item.title)}
                       key={`${item.title}_${i}`}>
              {item.title}
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Toolbar
