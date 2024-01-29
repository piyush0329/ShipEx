import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [auth] = useAuth()
  const getOrders = async () => {
    try {
      const buyerid = auth?.user._id
      const { data } = await axios.get(`/get-orders/${buyerid}`)
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.user._id) {
      getOrders()
    }
    // eslint-disable-next-line
  }, [auth?.user._id])

  const generateInvoice = async (o) => {
    try {
      const { status } = await axios.post('/invoice-generate', { o })
      if (status === 200) {
        alert('Invoice Generated Successfully')
      }

    } catch (error) {
      console.log(error);
    }

  }

  const cancelOrder = async (order) => {
    try {
      // const id = 're_3ObzvrSB0wwAWHZh0ieG8VPX'
      // const {data} = await axios.get(`/get-refund-status/${id}`)
      // console.log(data)
      const { data } = await axios.post('/refund', { order })
      if (data.refundId) {
        alert('Refund Initiated Successfully')
        getOrders()
      }
    } catch (error) {
      console.log(error)
    }
    console.log("order cancelled")
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
                        <div className="row px-3 flex-row" key={p._id}>
                          <div className="">
                            <p><strong>{p.description}</strong></p>
                            <p><strong>Weight:</strong> {p.weight}kg</p>
                            <p><strong>Shipment Value:</strong> ₹{p.shipmentValue}</p>
                            <p><strong>Start Location:</strong> {o.startLocation.officeName}</p>
                            <p><strong>Destination Location:</strong> {o.destinationLocation.officeName}</p>
                            <p><strong>Shipping Charge:</strong> ₹{p.price}</p>
                          </div>
                        </div>
                      </>
                      ))}
                      {
                        o.refundDetails ?
                          <div className='px-3 pb-3'>
                            <strong>Refund Status:</strong> {(o.refundDetails?.destination_details.card.reference_status !== "pending") ? `Refund successfully transfered to your original source. if not recieved by you then you can contact to  your bank with this reference id: ${o.refundDetails?.destination_details?.card?.reference}` : "Refund initiated successfully"} </div>
                          : ''
                      }
                    </div>
                    <div>
                      {(o.status === "Delivered") ? <button onClick={() => generateInvoice(o)} className='tw-btn tw-bg-red tw-text-white'>Generate Invoice</button> : ""
                      }
                      {(o.payment !== "Refunded" && o.status !== "Delivered") ? <button onClick={() => cancelOrder(o)} className='tw-btn tw-bg-red tw-text-white'>Cancel Order</button> : ""
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
