import React, { useEffect, useState } from 'react'
import EmployeeMenu from './EmployeeMenu'

import { Select } from 'antd'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'
const { Option } = Select

const EmployeeOrders = () => {
    const [status] = useState(["Out for delivery", "Delivered", "Cancelled"])
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/employee-all-orders")
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
             await axios.put(`/employee-order-status/${orderId}`, { status: value })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <div className='row'>
                <div className="col col-md-3">
                    <EmployeeMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {orders?.map((o, i) => {
                        return (
                            <div key={o._id} className="border shadow">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                            <th scope='col'>Total</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment}</td>
                                            <td>{o.totalAmount.toFixed(2)}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                            <div className="col-md-8">
                                                <p><strong>Description: </strong> {p.description.substring(0, 30)}</p>
                                                <p><strong>Start Location: </strong>{p.startLocation.officeName}</p>
                                                <p><strong>Destination Location: </strong>{p.destinationLocation.officeName}</p>
                                                <p><strong>Shipment Value: </strong>{p.shipmentValue}</p>
                                                <p><strong>Shipping Price: </strong>{p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default EmployeeOrders
