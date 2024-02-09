import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import AdminMenu from './AdminMenu'
import moment from 'moment'


const AdminUpdate = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const [dlNumber, setDlNumber] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        setEmail(auth?.user?.email)
        setName(auth?.user?.name)
        setRoll(auth?.user?.roll)
        setClassname(auth?.user?.classname)
        setPhone(auth?.user?.phone)
        setGender(auth?.user?.gender)
        const formatedDOb = moment(auth?.user?.dob).format('YYYY-MM-DD')
        setDob(formatedDOb)
        setAadharNumber(auth?.employee?.aadharNumber)
        setDlNumber(auth?.employee?.dlNumber)
        setAddress(auth?.employee?.address)

    }, [auth?.user, auth?.employee])
    const handleAdminUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/admin-details', { name, roll, classname, email, password, phone, gender, dob, aadharNumber, dlNumber, address })
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

                alert("Admin Data Updated Successfully")
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
    }

    return (
        <div>
            <div className="container-fluid dashboard tw-bg-lightGrey">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminMenu />
                    </div>
                    <div className="col-md-10 p-0">
                        <div className="card p-3 tw-bg-light">
                            <h4 className='text-center'>Update Admin Details</h4>
                            <div className='d-flex flex-column'>
                                <div className=''>
                                    <form onSubmit={handleAdminUpdate}>
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
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdate
