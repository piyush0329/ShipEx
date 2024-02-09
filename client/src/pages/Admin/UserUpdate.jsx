import axios from 'axios'
import React, { useState } from 'react'
import AdminMenu from './AdminMenu'
import moment from 'moment'

const UserUpdate = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [role, setRole] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [selectedOption, setSelectedOption] = useState('update')

    const fetchUser = async (e) => {
        e.preventDefault()
        try {
            if (email) {
                const { data } = await axios.get(`/load-user/${email}`)
                if (data?.success) {
                    setName(data.data.name)
                    setRoll(data.data.roll)
                    setClassname(data.data.classname)
                    setRole(data.data.role)
                    setPhone(data.data.phone)
                    setGender(data.data.gender)
                    const formatedDOb = moment(data.data.dob).format('YYYY-MM-DD')
                    setDob(formatedDOb)
                } else {
                    alert("please provide the valid email address")
                }
            } else {
                alert("please provide the valid email address")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/user-update', { name, roll, classname, email, role, password, gender, phone, dob })
            if (data?.error) {
                alert("error while updating user")
            }
            else {
                    setEmail('')
                    setName('')
                    setRoll('')
                    setClassname('')
                    setRole('')
                    setPhone('')
                    setGender('')
                    setDob('')
                    setPassword('')
                alert("User Updated Successfully")
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }

    }

    const handleDeleteUser = async (e) => {
        e.preventDefault()
        try {
            const { data, status } = await axios.delete(`/delete-user/${email}`);
            if (data?.success) {
                alert("User Deleted Successfully");
            } else if (status === 200 && !data?.success) {
                alert("user doesn't exist or email doesn't belong to valid user")
            }
            else {
                alert("error while deleteing user")
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }

    }
    return (
        <div className='container-fluid dashboard tw-bg-lightGrey'>
            <div className='row'>
                <div className='col-md-2 p-0'>
                    <AdminMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <div className='card p-3 tw-bg-light'>
                        <h4 className='text-center'>Update User Details</h4>
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <div className="form-check mx-4">
                                    <input className="form-check-input" value={'update'} onClick={(e) => setSelectedOption(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                    <label className="form-check-label fw-bold" htmlFor="flexRadioDefault1">
                                        Update User
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input mb-4" value={'delete'} onClick={(e) => setSelectedOption(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label fw-bold" htmlFor="flexRadioDefault2">
                                        Delete User
                                    </label>
                                </div>
                            </div>
                            <div className=''>
                                {
                                    selectedOption === 'update' ? <>
                                        <form onSubmit={handleUserUpdate}>
                                            <div className="mb-3">
                                                <label className="form-label d-block">User Email address</label>
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-75 d-inline" />
                                                <button onClick={fetchUser} className='tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl mx-2' >Find User</button>
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
                                                <label className="form-label">Role</label>
                                                <input type="number" value={role} onChange={(e) => setRole(e.target.value)} className="form-control" />
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
                                            <button type="submit" className="btn btn-secondary">Update User</button>
                                        </form>

                                    </> :
                                        <>

                                            <form onSubmit={handleDeleteUser}>
                                                <div className='m-4'>
                                                    <div className="mb-3">
                                                        <label className="form-label d-block">User Email address</label>
                                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-75 d-inline" />
                                                        <button type='submit' className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl mx-2" >Delete User</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                }
                            </div>
                        </div >
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserUpdate
