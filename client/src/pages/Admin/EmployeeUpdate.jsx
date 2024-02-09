import React, { useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import moment from 'moment'
import DeleteEmployee from './DeleteEmployee'


const EmployeeUpdate = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [roll, setRoll] = useState('')
    const [classname, setClassname] = useState('')
    const [role, setRole] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [aadharNumber, setAadharNumber] = useState('')
    const [dlNumber, setDlNumber] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [selectedOption, setSelectedOption] = useState('update')

    const fetchEmployee = async (e) => {
        e.preventDefault()
        try {
            if (email) {
                const { data } = await axios.get(`/load-employee/${email}`)
                if (data?.success) {

                    const { aadharNumber, dlNumber, address } = data.data.employeeDetails
                    setName(data.data.name)
                    setRoll(data.data.roll)
                    setClassname(data.data.classname)
                    setRole(data.data.role)
                    setPhone(data.data.phone)
                    setGender(data.data.gender)
                    const formatedDOb = moment(data.data.dob).format('YYYY-MM-DD')
                    setDob(formatedDOb)
                    setAadharNumber(aadharNumber)
                    setDlNumber(dlNumber)
                    setAddress(address)
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
    const handleEmployeeUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/employee-update', { name, roll, classname, email, role, password, gender, phone, dob, aadharNumber, dlNumber, address })
            if (data?.error) {
                alert("error while updating Employee")
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
                    setAadharNumber('')
                    setDlNumber('')
                    setAddress('')
                    setPassword('')
                alert("Employee Updated Successfully")
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
                        <h4 className='text-center'>Update Employee Details</h4>
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <div className="form-check mx-4">
                                    <input className="form-check-input" value={'update'} onClick={(e) => setSelectedOption(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                    <label className="form-check-label fw-bold" htmlFor="flexRadioDefault1">
                                        Update Employee
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input mb-4" value={'delete'} onClick={(e) => setSelectedOption(e.target.value)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label fw-bold" htmlFor="flexRadioDefault2">
                                        Delete Employee
                                    </label>
                                </div>
                            </div>
                            <div className=''>
                                {selectedOption === 'update' ? <form onSubmit={handleEmployeeUpdate}>

                                    <div className="mb-3">
                                        <label className="form-label d-block">Employee Email address</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-75 d-inline" />
                                        <button onClick={fetchEmployee} className='tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl mx-2' >Find Employee</button>
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
                                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Update Employee</button>
                                </form> :
                                    <DeleteEmployee />

                                }
                            </div>
                        </div >
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeUpdate
