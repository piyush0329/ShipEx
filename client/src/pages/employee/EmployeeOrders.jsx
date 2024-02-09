import React, { useEffect, useState } from 'react'
import EmployeeMenu from './EmployeeMenu'

import { Select } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../../context/auth'
const { Option } = Select

const EmployeeOrders = () => {
    const [auth] = useAuth()
    const [status] = useState(["Out for delivery", "Delivered"])
    const [orders, setOrders] = useState([])
    let [page, setPage] = useState()
    const limit =5
    const [totalPages, setTotalPages] = useState(1)
    const [params, setParams] = useState({ limit: limit, page: 1 })

    const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

    const getOrders = async (pageNumber) => {
        try {
            const { data } = await axios.get(`/employee-all-orders`, {
                params: {
                    ...params,
                    page: pageNumber
                }
            });
            setOrders(data.orders);
            const totalDocuments = data.orderlength || 0;
            const totalPages = Math.ceil(totalDocuments / limit);
            setTotalPages(totalPages);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getOrders(page);
        // eslint-disable-next-line
    }, [page]);

    const handleChange = async (orderId, value) => {
        try {
            await axios.put(`/employee-order-status/${orderId}`, { status: value, userId:auth.user._id })
            alert("Status Updated Successfully")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid tw-bg-lightGrey'>

            <div className='row'>
                <div className="col col-md-2 p-0">
                    <EmployeeMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <h1 className='text-center'>All Orders</h1>
                    {orders?.map((o, i) => {
                        return (
                            <div key={o._id} className="border table-responsive-sm table-responsive-md shadow tw-rounded-xl mt-2 shadow tw-bg-white">
                                <table className="tw-table">
                                    <thead className='tw-text-lg text-white tw-bg-red'>
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
                                            {o.status==="Delivered"?"Delivered":<Select
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
                                                }
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment}</td>
                                            <td>{o.totalAmount.toFixed(2)}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="">
                                    {o?.products?.map((p, i) => (
                                        <div className="mb-2 p-3" key={p._id}>
                                            <p><strong>Description: </strong> {p.description.substring(0, 30)}</p>
                                            <p><strong>Start Location: </strong>{o.startLocation.officeName}</p>
                                            <p><strong>Destination Location: </strong>{o.destinationLocation.officeName}</p>
                                            <p><strong>Shipment Value: </strong>{p.shipmentValue}</p>
                                            <p><strong>Shipping Price: </strong>{p.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <br />
                    <div className="tw-join text-center ">
                        {pageButtons.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`tw-join-item tw-btn tw-bg-white ${pageNumber === page ? 'tw-btn-active' : ''}`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeOrders
