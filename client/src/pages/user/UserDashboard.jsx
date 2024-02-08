import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'

const UserDashboard = () => {
    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [classname, setClassname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const { email, name, classname, roll, phone, gender, dob } = auth?.user
        setName(name)
        setRoll(roll)
        setClassname(classname)
        setEmail(email)
        setPhone(phone)
        setGender(gender)
        const formatedDOb = moment(dob).format('YYYY-MM-DD')
        setDob(formatedDOb)
    }, [auth?.user])

    const handleUserUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/user', { name, roll, classname, email, password, phone, gender, dob })
            if (data?.error) {
                alert("error")
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                alert("User Updated Successfully")
            }
        } catch (error) {
            console.log(error)
            alert("Something Went Wrong")
        }
    }
    return (
        <div className='d-flex flex-column tw-bg-lightGrey'>
            <h2 className='text-center'>Update User Profile</h2>
            <div className='border p-3'>
                <form onSubmit={handleUserUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
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
                        <label className="form-label">Phone</label>
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
                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Update</button>
                </form>
            </div>
        </div >
    )
}
export default UserDashboard
