import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (

      <>
      <div className="text-center">
        <div className="list-group">
          <Link to='/dashboard/admin' className='list-group-item bg-secondary text-white'><h4>Admin Panel</h4></Link>
          <Link
            to="/dashboard/admin/admin-profile"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            Update Me
          </Link>
          <Link
            to="/dashboard/admin/user-update"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            Update User
          </Link>
          <Link
            to="/dashboard/admin/employee-update"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            Update Employee
          </Link>
          <Link
            to="/dashboard/admin/create-employee"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            Create Employee
          </Link>
          <Link
            to="/dashboard/admin/create-office"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            Create Office
          </Link>
          <Link
            to="/dashboard/admin/update-orders"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
            All Orders
          </Link>
          <Link
            to="/dashboard/admin/order-details"
            className="list-group-item list-group-item-action tw-bg-lightpink"
          >
           Order Details
          </Link>
          
        </div>
      </div>
    
    </>
  )
}

export default AdminMenu
