import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import EmployeeMenu from './EmployeeMenu'
import moment from 'moment'

const UpdateDetails = () => {
    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const [dlNumber, setDlNumber] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const { email, name, classname, roll, phone, gender, dob } = auth?.user
        const { aadharNumber, dlNumber, address } = auth?.employee
        setName(name)
        setRoll(roll)
        setClassname(classname)
        setEmail(email)
        setPhone(phone)
        const formatedDOb = moment(dob).format('YYYY-MM-DD')
        setDob(formatedDOb)
        setGender(gender)
        setAadharNumber(aadharNumber)
        setDlNumber(dlNumber)
        setAddress(address)

    }, [auth?.user, auth?.employee])

    const handleEmployeeUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/employee', { name, roll, classname, email, password, dob, phone, gender, aadharNumber, dlNumber, address })
            if (data?.error) {
                alert("error")
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser, employee: data?.updatedEmployee })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                ls.employee = data.updatedEmployee
                localStorage.setItem('auth', JSON.stringify(ls))
                alert("Employee Updated Successfully")
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
    }
    return (
        <div className='container-fluid tw-bg-lightGrey'>
            <div className='row'>
                <div className="col-12 col-md-2 p-0">
                    <EmployeeMenu />
                </div>
                <div className="col-12 col-md-10 p-0">
                    <div className='card p-3 tw-bg-light'>
                        <div className="mt-3">
                            <h2 className='text-center'>Update Employee Profile</h2>
                            <form onSubmit={handleEmployeeUpdate} className=''>
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
                                    <label className="form-label">Aadhar Number</label>
                                    <input type="text" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Driving Licence Number</label>
                                    <input type="text" value={dlNumber} onChange={(e) => setDlNumber(e.target.value)} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                </div>
                                <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Update</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UpdateDetails
