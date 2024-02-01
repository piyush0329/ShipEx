
import { Route, Routes } from 'react-router';
import './App.css';
import IndexPage from './pages/IndexPage';
import Layout from './Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import UserRoute from './Routes/UserRoute';
import UserDashboard from './pages/user/UserDashboard';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserUpdate from './pages/Admin/UserUpdate';
import EmployeeUpdate from './pages/Admin/EmployeeUpdate';
import About from './pages/About';
import AdminUpdate from './pages/Admin/AdminUpdate';
import EmployeeRoute from './Routes/EmployeeRoute';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import CreateEmployee from './pages/Admin/CreateEmployee';
import CreateOffice from './pages/Admin/CreateOffice';
import Services from './pages/Services';
import Private from './Routes/Private';
import CartPage from './pages/CartPage';
import Orders from './pages/Orders';
import AdminOrders from './pages/Admin/AdminOrders';
import EmployeeOrders from './pages/employee/EmployeeOrders';
import UpdateDetails from './pages/employee/UpdateDetails';
import OrderDetails from './pages/Admin/OrderDetails';
import OrderStats from './pages/Admin/OrderStats';
import AddVehicle from './pages/Admin/AddVehicle';
import DeliveryOrderMapping from './pages/Admin/DeliveryOrderMapping';


axios.defaults.baseURL = 'http://localhost:8000'


function App() {
  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/shipex' element={<Private />} >
          <Route path='services' element={<Services />} />
          <Route path='services/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<UserRoute />} >
          <Route path='user' element={<UserDashboard />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/admin-profile' element={<AdminUpdate />} />
          <Route path='admin/user-update' element={<UserUpdate />} />
          <Route path='admin/employee-update' element={<EmployeeUpdate />} />
          <Route path='admin/create-employee' element={<CreateEmployee />} />
          <Route path='admin/create-office' element={<CreateOffice />} />
          <Route path='admin/add-vehicle' element={<AddVehicle />} />
          <Route path='admin/update-orders' element={<AdminOrders />} />
          <Route path='admin/order-details' element={<OrderDetails />} />
          <Route path='admin/order-stats' element={<OrderStats />} />
          <Route path='admin/delivery' element={<DeliveryOrderMapping />} />
        </Route>
        <Route path='/dashboard' element={<EmployeeRoute />}>
          <Route path='employee' element={<EmployeeDashboard />} />
          <Route path='employee/update-employee' element={<UpdateDetails />} />
          <Route path='employee/order-status' element={<EmployeeOrders />} />
        </Route>
      </Route>

    </Routes>

  );
}

export default App;
