import React from 'react'
import { useAuth } from '../../context/auth'
import EmployeeMenu from './EmployeeMenu'

const EmployeeDashboard = () => {
    const [auth] = useAuth()
    return (
        <div className="container-fluid dashboard tw-bg-lightGrey">
            <div className="row">
                <div className="col-md-2 p-0">
                    <EmployeeMenu />
                </div>
                <div className="col-md-10 p-0">
                    <div className="card p-3 tw-bg-light">
                        <h4 className='text-center'>Employee Details</h4>
                        <h5>Employee Name: {auth?.user?.name}</h5>
                        <h5>Employee Email: {auth?.user?.email}</h5>
                        <h5>Employee Class: {auth?.user?.classname}</h5>
                        <h5>Employee Phone: {auth?.user?.phone}</h5>
                        <h5>Employee Gender: {auth?.user?.gender}</h5>
                        <h5>Employee roll: {auth?.user?.roll}</h5>
                        <h5>Employee roll: {auth?.employee?.aadharNumber}</h5>
                        <h5>Employee Aadhar Card Number: {auth?.employee?.aadharNumber}</h5>
                        <h5>Employee Driving License Number: {auth?.employee?.dlNumber}</h5>
                        <h5>Employee Address: {auth?.employee?.address}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard
