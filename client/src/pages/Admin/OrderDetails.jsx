import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'

import { Select } from 'antd'
import moment from 'moment'
import axios from 'axios'
import { useAuth } from '../../context/auth'
const { Option } = Select

const OrderDetails = () => {
    const [orders, setOrders] = useState([])
    const [status] = useState(["Not Process", "Processing", "Shipped", "Out for delivery", "Delivered", "Cancelled"])
    const [paymentStatus] = useState(["Not Done", "Pending", "Cancelled", "Payment Done"])
    const [offices, setOffices] = useState([])
    const [auth] = useAuth()
    const limit = 5
    let [page, setPage] = useState()
    const [totalPages, setTotalPages] = useState(1)
    const [params, setParams] = useState({ limit: limit, page: 1 })
    

    const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

    const filterSubmit = async (pageNumber = 1) => {
        try {
            const { data } = await axios.get(`/get-order`, {
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
    };
    const getOffices = async () => {
        try {
            const { data } = await axios.get(`/get-office`,)
            if (data?.success) {
                setOffices(data?.offices)
            } else {
                alert("error in fetching offices")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleExport =async ()=>{
        try {
            const { data } = await axios.get(`/excel-worksheet`, {
                params: {
                    ...params
                }
            });
        } catch (error) {
            console.error(error);
        }



    }


    useEffect(() => {
        if (auth?.token) {
            getOffices()
        }
        // eslint-disable-next-line
    }, [auth?.token])
    useEffect(() => {
        filterSubmit(page);
        // eslint-disable-next-line
    }, [page]);
    return (
        <>
            <div className="row">
                <div className="col col-md-3">
                    <AdminMenu />
                </div>
                <div className="col col-md-9">
                    <div className=''>
                        <h1 className='text-center'>Order Details</h1>
                        <div className='border shadow table-responsive-sm table-responsive-md'>

                            <table className='tw-table'>
                                <thead className='tw-text-lg text-white tw-bg-red'>
                                    <tr>
                                        <th scope="col">Status</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Destination</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Select defaultValue={"Select any option"} onChange={(e) => setParams((prev) => { return { ...prev, status: e } })}>
                                                <Option>
                                                    Select any option
                                                </Option>
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>
                                            <Select defaultValue={"Select any option"} onChange={(e) => { setParams((prev) => { return { ...prev, payment: e } }) }}>
                                                <Option selected>
                                                    Select any option
                                                </Option>
                                                {paymentStatus.map((p, i) => (
                                                    <Option key={i} value={p}>
                                                        {p}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>
                                            <Select defaultValue={'Select any option'} onChange={(e) => { setParams((prev) => { return { ...prev, source: e } }) }}>
                                                <Option>Select any option</Option>
                                                {offices.map((o, i) => (
                                                    <Option key={i} value={o.officeName}>
                                                        {o.officeName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>
                                            <Select defaultValue={'Select any option'} onChange={(e) => { setParams((prev) => { return { ...prev, destination: e } }) }}>
                                                <Option>Select any option</Option>
                                                {offices.map((o, i) => (
                                                    <Option key={i} value={o.officeName}>
                                                        {o.officeName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type='button' onClick={filterSubmit} className='btn btn-secondary'>Filter</button>
                            <button type='button' onClick={handleExport} className='btn btn-secondary mx-2'>Export</button>

                        </div>
                        <br />
                        <br />
                        {orders?.map((o, i) => {
                            return (
                                <div key={o._id} className="border shadow table-responsive-sm table-responsive-md">
                                    <table className="table">
                                        <thead>
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
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    {o?.status}
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).format('DD-MM-YYYY')}</td>
                                                <td>{o?.payment}</td>
                                                <td>{o?.totalAmount.toFixed(2)}</td>
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
                        <br />
                        <div className="tw-join text-center">
                            {pageButtons.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`tw-join-item tw-btn ${pageNumber === page ? 'tw-btn-active' : ''}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default OrderDetails
