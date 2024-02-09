import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (

    <>
      <div className="text-center tw-flex tw-flex-col">
        <div className="list-group tw-flex-1">
          <NavLink to='/dashboard/admin' className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}>Admin Panel</NavLink>
          <NavLink
            to='/dashboard/admin-profile' className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Update Me
          </NavLink>
          <NavLink
            to="/dashboard/user-update"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Update User
          </NavLink>
          <NavLink
            to="/dashboard/employee-update"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Update Employee
          </NavLink>
          <NavLink
            to="/dashboard/create-employee"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Create Employee
          </NavLink>
          <NavLink
            to="/dashboard/create-office"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Create Office
          </NavLink>
          <NavLink
            to="/dashboard/add-vehicle"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Add Vehicle
          </NavLink>
          <NavLink
            to="/dashboard/update-vehicle"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Update Vehicle Details
          </NavLink>
          <NavLink
            to="/dashboard/update-orders"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            All Orders
          </NavLink>
          <NavLink
            to="/dashboard/order-details"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Order Details
          </NavLink>
          <NavLink
            to="/dashboard/order-stats"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Order Statistics
          </NavLink>
          <NavLink
            to="/dashboard/delivery"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Orders Shipping
          </NavLink>
          <NavLink
            to="/dashboard/status-log"
            className={({ isActive }) => `list-group-item ${isActive ?"bg-secondary text-white":"tw-bg-lightpink"}`}
          >
            Status Log Update
          </NavLink>

        </div>
      </div>

    </>
  )
}

export default AdminMenu
