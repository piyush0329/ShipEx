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

  const generateInvoice = async (o) => {
    try {
      const { data } = await axios.post('/invoice-generate', { o })
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      <div className="container-fluid p-3 tw-bg-lightGrey">
        <div className="row">

          <div className="col-md-12">
            <h1 className='text-center'>All Orders</h1>
            {
              orders?.map((o, i) => {
                return (
                  <div key={o._id} className='border table-responsive-sm table-responsive-md tw-rounded-xl shadow mt-2 tw-bg-white'>
                    <table className='tw-table'>
                      <thead className='tw-text-lg text-white tw-bg-red'>
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
                    <div className="container-fluid">
                      {o?.products?.map((p, i) => (<>
                        <div className="row flex-row" key={p._id}>
                          <div className="">
                            <p><strong>{p.description}</strong></p>
                            <p>Weight: {p.weight}kg</p>
                            <p>Shipment Value: ₹{p.shipmentValue}</p>
                            <p>Start Location: {p.startLocation.officeName}</p>
                            <p>Destination Location: {p.destinationLocation.officeName}</p>
                            <p><strong>Shipping Charge : ₹{p.price}</strong></p>
                          </div>
                        </div>
                      </>
                      ))}
                    </div>
                    <div>

                      {(o.status === "Delivered") ? <button onClick={() => generateInvoice(o)} className='tw-btn tw-bg-red tw-text-white'>Generate Invoice</button> : ""
                      }
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
