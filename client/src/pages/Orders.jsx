import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import '../style.css'
const Orders = () => {

  const [orders, setOrders] = useState([])
  const [auth] = useAuth()
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    try {
      const buyerid = auth?.user._id
      const { data } = await axios.get(`/get-orders/${buyerid}`)
      setOrders(data?.updatedOrders)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
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
      const { data } = await axios.post('/refund', { order, userId: auth.user._id })
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
    !loading &&
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

                      {o?.products?.map((p, i) => (
                        <div className="row px-3 flex-row" key={i}>
                          <div className="">
                            <p><strong>{p.description}</strong></p>
                            <p><strong>Weight:</strong> {p.weight}kg</p>
                            <p><strong>Shipment Value:</strong> ₹{p.shipmentValue}</p>
                            <p><strong>Start Location:</strong> {o.startLocation.officeName}</p>
                            <p><strong>Destination Location:</strong> {o.destinationLocation.officeName}</p>
                            <p><strong>Shipping Charge:</strong> ₹{p.price}</p>
                            {
                              o.status!=='Delivered'?o.expectedDelivery != null ? <p>Expected Delivery {moment(o?.expectedDelivery).format("DD-MM-YYYY")}</p> : "":''
                            }
                          </div>
                          <div className=''>
                            <div className="row">
                              <div className="col-md-12 col-lg-12">
                                <div id="tracking-pre" />
                                <div id="tracking">
                                  <div className="tracking-list">
                                    {
                                      o.timeLine.map((t, i) => (
                                        <div className="tracking-item" key={i}>
                                          {
                                            t?.order_status === "Not Process" ?
                                              <div className="tracking-icon status-outfordelivery">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="37" width="30" viewBox="0 0 448 512"><path fill="#ffffff" d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z" /></svg>
                                              </div>
                                              : t?.order_status === "Delivered" ?
                                                <div className="tracking-icon status-inforeceived">
                                                  <svg className="svg-inline--fa fa-clipboard-list fa-w-12" aria-hidden="true" data-prefix="fas" data-icon="clipboard-list" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg>
                                                    <path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z" />
                                                  </svg>
                                                </div>
                                                :
                                                <div className="tracking-icon status-outfordelivery">
                                                  <svg className="svg-inline--fa fa-shipping-fast fa-w-20" aria-hidden="true" data-prefix="fas" data-icon="shipping-fast" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg>
                                                    <path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" />
                                                  </svg>
                                                </div>
                                          }

                                          <div className="tracking-date">{moment(t?.createdAt).format('DD-MM-YYYY')}<span>{moment(t?.createdAt).format('hh:mm A')}</span></div>
                                          <div className="tracking-content">{t?.order_status}
                                            <span>
                                              {
                                                t.location !== null ? <div className="tw-timeline-end tw-timeline-box">{t?.location?.officeName}</div> : ''
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {
                        o.refundDetails ?
                          <div className='px-3 pb-3'>
                            <strong>Refund Status:</strong>
                            {
                              (o.refundDetails?.destination_details.card.reference_status !== "pending") ?
                                `Refund successfully transfered to your original source. if not recieved by you then you can contact to  your bank with this reference id: ${o.refundDetails?.destination_details?.card?.reference}`
                                : "Refund initiated successfully"
                            }
                          </div>
                          : ''
                      }
                    </div>
                    <div>
                      {(o.status === "Delivered") ?
                        <button onClick={() => generateInvoice(o)} className='tw-btn tw-bg-red tw-text-white'>Generate Invoice</button>
                        : ""
                      }
                      {((o.payment !== "Refunded" && o.status !== "Delivered")) ?
                        <button onClick={() => cancelOrder(o)} className='tw-btn tw-bg-red tw-text-white'>Cancel Order</button>
                        : ""
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
