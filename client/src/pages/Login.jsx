import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const [auth,setAuth] = useAuth()


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/login', { email, password })

            if (res && res.data.success) {
                alert(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    employee: res.data.employee,
                    token: res.data.token
                  })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/");
            }else{
                alert(res.data.message)
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <div className='d-flex flex-column tw-bg-lightGrey'>
            <h1 className='text-center'>Login</h1>

            <div className='border p-4'>
                <form onSubmit={handleLogin} >
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Submit</button>
                    <div className="mb-3">
                        <Link to={'/register'} className="form-label underline text-black">Dont't have an account yet?<span className='font-weight-bold text-primary'>Register</span></Link>

                    </div>
                </form>
            </div>

        </div >
    )
}

export default Login
