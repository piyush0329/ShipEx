
import { Outlet } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import IndexPage from "../pages/IndexPage"

export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            try {
            const res = await axios.get("/admin-auth")
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        } catch (error) {
                console.log(error)
                setOk(false)
        }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])

    return ok ? <Outlet /> : <IndexPage />
}