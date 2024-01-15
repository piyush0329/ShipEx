import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="text-bg-info bottom-0 mt-4">
            <footer className="footer mt-auto py-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-muted">Home</Link></li>
                    <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-muted">Features</Link></li>
                    <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-muted">Pricing</Link></li>
                    <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-muted">FAQs</Link></li>
                    <li className="nav-item"><Link to={'/about'} className="nav-link px-2 text-muted">About</Link></li>
                </ul>
                <p className="text-center text-muted">© 2024 Company, Inc</p>
            </footer>

        </div>
    )
}

export default Footer
