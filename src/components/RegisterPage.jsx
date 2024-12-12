import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, Input, Flex } from 'antd'

export const RegisterPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [registerError, setRegisterError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== repeatPassword) {
      setRegisterError('Passwords do not match')
      return
    }

    if (!email || !password) {
      setRegisterError('Please fill in all fields')
      return
    }

    try {
      const response = await axios.post('/api/register', { email, password })
      if (response.status === 201) {
        navigate('/login')
      } else {
        setRegisterError(`Registration failed with status: ${response.status}`)
      }
    } catch (error) {
      setRegisterError(error.message)
    }
  }

  const handleChange = (setState) => (e) => setState(e.target.value)

  return (
    <Flex gap="small" align="center" style={{ width: '500px' }} vertical>
      <div>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <Flex gap="small" style={{ width: '500px' }} vertical>
            <Input
              size="large"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleChange(setEmail)}
              required
              prefix={<UserOutlined />}
            />

            <Input.Password
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />
            <Input.Password
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={handleChange(setRepeatPassword)}
              required
            />
            <Button htmlType="submit" type="primary" size="large">
              Register
            </Button>
            {registerError && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                {registerError}
              </p>
            )}
            <p style={{ textAlign: 'center' }}>
              Already have account ? <Link to="/login">Login</Link>
            </p>
          </Flex>
        </form>
      </div>
    </Flex>
  )
}
