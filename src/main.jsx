import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'

const PasswordInput = (p) => {

  const [rawValue, setRawValue] = useState('')
  const inputRef = typeof p.inputRef !== 'undefined'
    ? p.inputRef
    : useRef()

  const handleChange = (e) => {
    const input = e.target
    const data = e.nativeEvent.data
    const selectionStart = input.selectionStart ?? rawValue.length
    const selectionEnd = input.selectionEnd ?? rawValue.length

    let newRaw = rawValue.split('')

    if (data) {
      const insertPos = selectionStart - data.length
      newRaw.splice(insertPos, 0, ...data)
    } else {
      let deletePos = selectionStart
      let deleteCount = 1

      if (selectionStart !== selectionEnd) {
        deleteCount = selectionEnd - selectionStart
      } else if (input.value.length === 0) {
        deletePos = 0
        deleteCount = rawValue.length
      }

      newRaw.splice(deletePos, deleteCount)
    }

    const updatedRaw = newRaw.join('')
    setRawValue(updatedRaw)
    p.onChange({
      target: {
        name: e.target.name,
        value: updatedRaw,
      }
    })

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.value = '•'.repeat(updatedRaw.length)
        inputRef.current.setSelectionRange(selectionStart, selectionStart)
      }
    })
  }

  return (
    <input
      defaultValue=""
      ref={inputRef}
      name={p.name}
      onChange={handleChange}
      placeholder={p.placeholder}
      type={'text'}
    />
  )
}

const App = (p) => {
  const [emailAddress, setEmailAddress] = useState('stevus06@gmail.com')
  const [_password, setPassword] = useState('')
  const [_confirmPassword, setConfirmPassword] = useState('')

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
      <PasswordInput
        onChange={(e) => {
          window.history.replaceState({}, null, '/')
          setPassword(e.target.value)
        }}
        placeholder='Password'
      />
      <PasswordInput
        onChange={(e) => {
          window.history.replaceState({}, null, '/')
          setConfirmPassword(e.target.value)
        }}
        placeholder='Confirm Password'
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)