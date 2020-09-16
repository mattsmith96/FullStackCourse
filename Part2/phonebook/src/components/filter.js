import React from 'react'

const Filter = (props) => {
  return (
    <div>
      Filter Names: <input value={props.filter} onChange={props.changeFilterInput}/>
    </div>
  )
}

export default Filter