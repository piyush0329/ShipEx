import React from 'react'
import {  NavLink } from 'react-router-dom'

const EmployeeMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/dashboard/employee"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}>
            Employee Details
          </NavLink>
          <NavLink
            to="/dashboard/update-employee"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}>
            Update Employee Details
          </NavLink>
          <NavLink
            to="/dashboard/order-status"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}>
            Update Order Status
          </NavLink>

        </div>
      </div>
    </div>
  )
}

export default EmployeeMenu
