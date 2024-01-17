import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../../context/auth'
import { Select } from 'antd'
const { Option } = Select

const AdminOrders = () => {

    const [status] = useState(["Not Process", "Processing", "Shipped", "Out for delivery", "Delivered", "Cancelled"])
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()
    let [page, setPage] = useState()
    const limit =5
    const [totalPages, setTotalPages] = useState(1)
    const [params, setParams] = useState({ limit: limit, page: 1 })

    const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

    const getOrders = async (pageNumber) => {
        try {
            const { data } = await axios.get(`/all-orders`, {
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
            await axios.put(`/order-status/${orderId}`, { status: value })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid p-3 tw-bg-lightGrey'>

            <div className='row'>
                <div className="col col-md-3">
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {orders?.map((o, i) => {
                        return (
                            <div key={o._id} className="border shadow table-responsive-sm table-responsive-md mt-2 tw-rounded-xl tw-bg-white">
                                <table className="tw-table tw-rounded-xl">
                                    <thead className='tw-text-lg tw-text-white tw-bg-red'>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Total Amount</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white'>
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
                                            <td>{o?.totalAmount.toFixed(2)}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container-fluid">
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 flex-row" key={p._id}>
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

export default AdminOrders