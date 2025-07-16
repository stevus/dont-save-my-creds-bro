import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (p) => {
  const [emailAddress, setEmailAddress] = useState('stevus06@gmail.com')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div>
      <input
        onChange={(e) => {
          setEmailAddress(e.target.value)
        }}
        placeholder='Email Address'
        type='text'
        value={emailAddress}
      />
      <input
        onChange={(e) => {
          window.history.replaceState({}, null, '/')
          setPassword(e.target.value)
        }}
        placeholder='Password'
        type='text'
        value={password.replace(/./g, '•')}
      />
      <input
        onChange={(e) => {
          window.history.replaceState({}, null, '/')
          setConfirmPassword(e.target.value)
        }}
        placeholder='Confirm Password'
        type='text'
        value={confirmPassword.replace(/./g, '•')}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)