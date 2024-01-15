import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [auth] = useAuth()
  const getOrders = async () => {
    try {
      const buyerid = auth.user._id
      const { data } = await axios.get(`/get-orders/${buyerid}`)
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.token) { 
      getOrders()
    }
// eslint-disable-next-line
  }, [auth?.token])


  return (
    <div>      
      <div className="container-fluid p-3 m-3">
        <div className="row">
          
          <div className="col-md-12">
            <h1 className='text-center'>All Orders</h1>
            {
              orders?.map((o, i) => {
                return (
                  <div key={o._id} className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#
                          </th>
                          <th scope='col'>Status
                          </th>
                          <th scope='col'>Buyer
                          </th>
                          <th scope='col'>Date
                          </th>
                          <th scope='col'>Payment
                          </th>
                          <th scope='col'>Total Amount
                          </th>
                          <th scope='col'>Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {i + 1}
                          </td>
                          <td>
                            {o?.status}
                          </td>
                          <td>
                            {o?.buyer?.name}
                          </td>
                          <td>
                            {moment(o?.createdAt).fromNow()}
                          </td>
                          <td>
                            {o.payment}
                          </td>
                          <td>
                            {o.totalAmount.toFixed(2)}
                          </td>
                          <td>
                            {o?.products?.length}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="">
                            <p><strong>{p.description}</strong></p>
                            <p>Weight: {p.weight}kg</p>
                            <p>Shipment Value: ₹{p.shipmentValue}</p>
                            <p><strong>Shipping Charge : ₹{p.price}</strong></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
