import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router'
import Login from '../pages/Login'

const Private = () => {
  const [ok, setOk] = useState(false)
  const [auth] = useAuth()
  const [loading, setLoading] = useState(true)

  const authCheck = async () => {
    try {
      const res = await axios.get("/auth")
      if (res.data.ok) {
        setOk(true)
      }
      else {
        setOk(false)
      }
    } catch (error) {
      console.log(error);
      setOk(false);
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    if (auth?.token) authCheck()
  }, [auth?.token])

  return ok ? <Outlet /> : <Login />
}

export default Private

