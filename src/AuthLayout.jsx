import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export const AuthLayout = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      axios
        .post('/api/check-auth', { token })
        .then((response) => {
          if (response.data.auth) {
            setIsAuth(true)
            setRedirect('/settings')
          } else {
            setIsAuth(false)
            setRedirect('/login')
          }
        })
        .catch((error) => {
          setIsAuth(false)
          setRedirect('/login')
        })
    } else {
      setRedirect('/login')
    }
  }, [])

  return <div>{redirect && <Navigate to={redirect} />}</div>
}
