import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <div className='list-group-item bg-secondary text-white'><h4>Employee Panel</h4></div>
          <Link
            to="/dashboard/employee"
            className="list-group-item list-group-item-action tw-bg-lightpink">
            Employee Details
          </Link>
          <Link
            to="/dashboard/employee/update-employee"
            className="list-group-item list-group-item-action tw-bg-lightpink">
            Update Employee Details
          </Link>
          <Link
            to="/dashboard/employee/order-status"
            className="list-group-item list-group-item-action tw-bg-lightpink">
            Update Order Status
          </Link>

        </div>
      </div>
    </div>
  )
}

export default EmployeeMenu
