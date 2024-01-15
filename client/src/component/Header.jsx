import React from 'react'
import { Link } from 'react-router-dom'
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
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#F5385D' }}>
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-white" >ShipEx</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link active text-white" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/about'} className="nav-link text-white" >About</Link>
                            </li>
                        </ul>
                        <div className="d-flex" >
                            {
                                !auth.user ? (<>
                                    <div className="nav-item d-flex">
                                        <Link to="/register" className="nav-link mx-2 text-white">
                                            Register
                                        </Link>
                                        <Link to="/login" className="nav-link text-white">
                                            Login
                                        </Link>
                                    </div>

                                </>) : (<div className='d-flex'>
                                    <div className="nav-link mx-2 text-white" aria-expanded="false">
                                        <Link to="/shipex/services/orders" className="nav-link text-white">
                                            My Orders
                                        </Link>
                                    </div>
                                    <div className="nav-link mx-2 text-white" aria-expanded="false">
                                        <Link to="/shipex/services" className="nav-link text-white">
                                            Services
                                        </Link>
                                    </div>
                                    <div className="nav-link mx-2 text-primary-emphasis" aria-expanded="false">
                                        {auth?.user?.name}
                                    </div>
                                    <div className=''>
                                    <Link to={'/cart'} className="nav-link btn btn-outline-danger mx-1 position-relative text-white">
                                        Cart
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                                            {cart.length}
                                        </span>
                                    </Link>
                                    </div>
                                    <div className="nav-link">
                                        <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'employee' : 'user'}`} className="nav-link mx-2 text-white" >Dashboard</Link>
                                    </div>
                                    <div className='nav-link'>
                                        <Link to="/login" onClick={handleLogout} className="nav-link text-white">
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
