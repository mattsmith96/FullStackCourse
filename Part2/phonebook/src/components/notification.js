import React from 'react'

const Notification = ({message, error}) => {
  if (message === null) {
    return null
  }
  const alertStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle = {...alertStyle, color: 'red'}

  const messageStyle = error ? errorStyle : alertStyle

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification