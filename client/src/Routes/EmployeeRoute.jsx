import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router'
import IndexPage from '../pages/IndexPage'

const EmployeeRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("/employee-auth")
                if (res.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
                setOk(false)
            }
            finally {
                setLoading(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])

    return !loading ? ok ? <Outlet /> : <IndexPage /> : ''

}

export default EmployeeRoute
