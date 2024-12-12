import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { RegisterPage } from './components/RegisterPage'
import { AuthLayout } from './AuthLayout'
import { ParameterPage } from './components/Parameterpage/ParameterPage'
import { Content } from './components/ContentPage/ContentPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="/login" element={<LoginPage />} exact />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/content" element={<Content />} />

      <Route path="/authlayout" element={<AuthLayout />} />
      <Route path="/settings" element={<ParameterPage />} />
    </Routes>
  )
}

export default App
