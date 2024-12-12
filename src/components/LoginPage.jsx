import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserOutlined } from '@ant-design/icons'
import { Button, Input, Flex, Form } from 'antd'

export const LoginPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (values) => {
    setError('')
    try {
      const response = await axios.post('/api/login', values)

      if (response.status === 200) {
        const token = response.data.token

        if (token) {
          Cookies.set('token', token, { expires: 1, path: '/' })
          navigate('/', { replace: true })
        } else {
          setError('Invalid token received from server')
        }
      } else {
        setError(response.data.error || 'Login failed.')
      }
    } catch (error) {
      setError('Login failed. Check your network or credentials.')
      console.error('Login Error:', error)
    }
  }

  return (
    <Flex align="center" style={{ width: '500px' }} vertical>
      <h2>Login</h2>
      <Form form={form} onFinish={handleSubmit} align="center">
        <Flex gap="small" style={{ width: '500px' }} vertical>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input size="large" placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            Login
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p style={{ textAlign: 'center', color: 'white' }}>
            Haven't account ? <Link to="/register">Register</Link>
          </p>
        </Flex>
      </Form>
    </Flex>
  )
}
