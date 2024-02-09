import React, { useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'


const CreateEmployee = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [role, setRole] = useState(2)
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const [dlNumber, setDlNumber] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')


    const handleCreateEmployee = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/create-employee', { name, roll, classname, email, role, password, gender, phone, dob, aadharNumber, dlNumber, address })
            if (data?.error) {
                alert(data.error)
            }
            else if (data?.success) {
                alert("Employee Created Successfully")

            }
            else {
                alert("Error while Creating Employee")

            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
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
                        <h4 className='text-center'>Create Employee</h4>
                        <div className='d-flex flex-column'>
                            <div className=''>
                                <form onSubmit={handleCreateEmployee}>
                                    <div className="mb-3">
                                        <label className="form-label">Employee Email address</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
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
                                        <input type="number" disabled value={role} onChange={(e) => setRole(e.target.value)} className="form-control" />
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
                                        <label className="form-label">DL Number</label>
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
                                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Create Employee</button>
                                </form>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateEmployee
