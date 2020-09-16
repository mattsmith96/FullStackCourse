import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNameHandler}>
      <div>
        name: <input value={props.newName} onChange={props.changeNameInput}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.changeNumberInput}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;