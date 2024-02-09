import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'


const Header = () => {

    const [auth, setAuth] = useAuth()
    const [cart] = useCart()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        alert("Logout Successfully")
    }
    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#F5385D' }}>
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-white" >ShipEx</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/'} className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`} aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/about'} className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`} >About</NavLink>
                            </li>

                            {
                                !auth.user ? (<>

                                    <li>
                                        <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/cart'} className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                            <div className="tw-p-0 tw-bg-red tw-border-none">
                                                Cart
                                                <span className="tw-badge tw-rounded-full">{cart.length}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                </>
                                ) : (
                                    <>
                                        <li className="nav-item text-white" >
                                            <NavLink to="/shipex/orders" className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                                My Orders
                                            </NavLink>
                                        </li>
                                        <li className="nav-item text-white" >
                                            <NavLink to="/shipex/services" className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                                Services
                                            </NavLink>
                                        </li>
                                        <li className="nav-item" >
                                            <div className='nav-link'>{auth?.user?.name}</div>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'employee' : 'user'}`} className={({isActive})=>`nav-link ${isActive?'tw-text-blue-300':'text-white'}`} >Dashboard</NavLink>
                                            
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink to={'/cart'} className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                                <div className="tw-p-0 tw-bg-red tw-border-none">
                                                    Cart
                                                    <span className="tw-badge tw-rounded-full">{cart.length}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink to="/login" onClick={handleLogout} className={({ isActive }) => `nav-link ${isActive ? 'tw-text-blue-300' : 'text-white'}`}>
                                                Logout
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
