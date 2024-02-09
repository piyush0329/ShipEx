import React, { } from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {

  const [auth] = useAuth()

  return (

    <>
      <div className="container-fluid dashboard tw-bg-lightGrey">
        <div className="row">
          <div className="col-12 col-md-2 p-0">
            <AdminMenu />
          </div>

          <div className="col-12 col-md-10 p-0">
            <div className="card p-3 tw-bg-light">
              <h5> Admin Name: {auth?.user?.name}</h5>
              <h5> Admin Email: {auth?.user?.email}</h5>
              <h5> Admin Class: {auth?.user?.classname}</h5>
              <h5> Admin Phone : {auth?.user?.phone}</h5>
              <h5> Admin Gender: {auth?.user?.gender}</h5>
              <h5> Admin roll: {auth?.user?.roll}</h5>
              <h5> Admin Aadhar Card Number: {auth?.employee?.aadharNumber}</h5>
              <h5> Admin Driving License Number: {auth?.employee?.dlNumber}</h5>
              <h5> Admin Address: {auth?.employee?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminDashboard
