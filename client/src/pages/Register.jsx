import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/register', { name, roll, classname, email, password, phone, gender, dob })
            if (res && res.data.success) {
                alert(res.data && res.data.message);
                setPassword('')
                navigate('/login')

            } else {
                setPassword('')
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <div className='d-flex flex-column tw-bg-lightGrey'>
            <h1 className='text-center'>Register</h1>
            <div className='border p-4'>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Roll Number</label>
                        <input type="number" value={roll} onChange={(e) => setRoll(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Class</label>
                        <input type="number" value={classname} onChange={(e) => setClassname(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">DOB</label>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Submit</button>
                    <div className="mb-3">
                        <Link to={'/login'} className="form-label underline text-black">Already a user?<span className='font-weight-bold text-primary'>Login</span></Link>

                    </div>
                </form>
            </div>

        </div >
    )
}

export default Register
