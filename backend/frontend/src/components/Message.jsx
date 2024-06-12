import React from 'react'
import { Alert } from 'react-bootstrap'
function Message({type, message}) {
  return (
    <Alert variant={type} >
        {message}
    </Alert>
  )
}

export default Message