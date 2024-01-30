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
                                <Link to={'/'} className="nav-link active text-white" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/about'} className="nav-link text-white" >About</Link>
                            </li>

                            {
                                !auth.user ? (<>

                                    <li>
                                        <Link to="/register" className="nav-link text-white">Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="nav-link text-white">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/cart'} className='nav-link '>
                                            <div className="tw-p-0 tw-bg-red text-white tw-border-none">
                                                Cart
                                                <span className="tw-badge tw-rounded-full">{cart.length}</span>
                                            </div>
                                        </Link>
                                    </li>

                                </>
                                ) : (
                                    <>
                                        <li className="nav-item text-white" >
                                            <Link to="/shipex/services/orders" className="nav-link text-white">
                                                My Orders
                                            </Link>
                                        </li>
                                        <li className="nav-item text-white" >
                                            <Link to="/shipex/services" className="nav-link text-white">
                                                Services
                                            </Link>
                                        </li>
                                        <li className="nav-item" >
                                            <Link to={'/'} className='nav-link'>{auth?.user?.name}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'employee' : 'user'}`} className="nav-link text-white" >Dashboard</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link to={'/cart'} className='nav-link '>
                                                <div className="tw-p-0 tw-bg-red text-white tw-border-none">
                                                    Cart
                                                    <span className="tw-badge tw-rounded-full">{cart.length}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link to="/login" onClick={handleLogout} className="nav-link text-white">
                                                Logout
                                            </Link>
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
