import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { Select } from 'antd'
import axios from 'axios'
import { useAuth } from '../../context/auth'
const { Option } = Select

const DeliveryOrderMapping = () => {
    const [auth] = useAuth()
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [selectedVehicleData, setSelectedVehicleData] = useState('')
    const [orders, setOrders] = useState([])
    const [checkedOrders, setCheckedOrders] = useState([])

    const getVehicles = async () => {
        try {
            const { data } = await axios.get('/get-free-vehicle')
            setVehicles(data.vehicles)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getVehicles()
        // eslint-disable-next-line 
    }, [])
    const getSelectedVehicles = async () => {
        try {
            if (selectedVehicle !== null) {
                const { data } = await axios.get(`/get-vehicle/${selectedVehicle}`)
                setSelectedVehicleData(data.vehicle)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`/delivery-orders`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    useEffect(() => {
        getSelectedVehicles()
         // eslint-disable-next-line
    }, [selectedVehicle])


    const handleCheckboxChange = (event) => {
        const orderId = event.target.value;
        const isChecked = event.target.checked;
        setCheckedOrders((prevCheckedOrders) => {
            if (isChecked && !prevCheckedOrders.includes(orderId)) {
                setSelectedVehicleData((prev) => {
                    const order = orders.find((o) => o._id === orderId);
                    return {
                        ...prev,
                        capacity: prev.capacity - order.products[0].weight,
                    };
                });
                return [...prevCheckedOrders, orderId];
            } else if (!isChecked && prevCheckedOrders.includes(orderId)) {
                setSelectedVehicleData((prev) => {
                    const order = orders.find((o) => o._id === orderId);
                    return {
                        ...prev,
                        capacity: prev.capacity + order.products[0].weight,
                    };
                });
                return prevCheckedOrders.filter((id) => id !== orderId);
            } else {
                return prevCheckedOrders;
            }
        });
    };

    const handleOrderMapping = async (e) => {
        e.preventDefault()
        try {
            if (checkedOrders.length > 0) {
                if (selectedVehicleData.capacity >= 0) {
                    const { data } = await axios.post('/map-orders', { vehicleId: selectedVehicle, orders: checkedOrders, userid: auth.user._id })
                    if (data?.success) {
                        alert("Order Shipped Successfully")
                        getVehicles()
                        getOrders()
                        setCheckedOrders([])
                        setSelectedVehicle(null)
                        setSelectedVehicleData('')
                    }
                } else {
                    alert("Orders capacity is more than vehicle capacity")
                }
            } else {
                alert("Select any order to ship")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container-fluid dashboard tw-bg-lightGrey'>
            <div className='row'>
                <div className='col-md-2 p-0'>
                    <AdminMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <div className='card p-3 tw-bg-light'>
                        <h4 className='text-center'>Orders Shipping </h4>
                        <div className='d-flex flex-column'>
                            <div className=''>
                                Select Vehicle Number:
                                <Select value={selectedVehicle} className='w-100' onChange={(e) => { setSelectedVehicle(e); setCheckedOrders([]) }}>
                                    <Option disabled value={null}>
                                        Select any option
                                    </Option>
                                    {vehicles?.map((v, i) => (
                                        <Option key={i} value={v._id}>
                                            {"Number:" + v.vehicleNo}
                                        </Option>
                                    ))}
                                </Select>
                                <form onSubmit={handleOrderMapping}>
                                    {selectedVehicle !== null &&
                                        <div>
                                            <div className='row mt-4'>
                                                <div className='tw-text-md col-12 col-md-4 tw-text-center'>Capacity of Vehicle: {selectedVehicleData.capacity}kg</div>
                                                <div className='tw-text-md col-12 col-md-4 tw-text-center'>Driver Name: {selectedVehicleData.driver}</div>
                                                <div className='tw-text-md col-12 col-md-4 tw-text-center'>Model Name: {selectedVehicleData.model}</div>
                                            </div>
                                            <div className='mt-4'>
                                                <h4>Select Orders to ship:</h4>
                                                {orders && orders.map((o, i) => (
                                                    <div key={i} className="btn-group col-12 col-md-4 mt-2" role="group" aria-label="Basic checkbox toggle button group">
                                                        <input type="checkbox"
                                                            value={o._id}
                                                            checked={checkedOrders.includes(o._id)}
                                                            onChange={handleCheckboxChange}
                                                            className="btn-check"
                                                            id={`btncheck${i}`}
                                                            autoComplete="off" />
                                                        <label className="btn text-start btn-outline-success" htmlFor={`btncheck${i}`}>
                                                            <div>
                                                                Buyer Name: {o.buyer.name}
                                                            </div>
                                                            <div>
                                                                Start Location: {o.startLocation.officeName}
                                                            </div>
                                                            <div>
                                                                Destination Location: {o.destinationLocation.officeName}
                                                            </div>
                                                            <div>
                                                                Shipping Price: {o.totalAmount}
                                                            </div>
                                                            {
                                                                o.products.map((p, i) => (
                                                                    <div key={i}>
                                                                        <div>
                                                                            Description: {p.description}
                                                                        </div>
                                                                        <div>
                                                                            Shipment Weight: {p.weight}kg
                                                                        </div>

                                                                    </div>
                                                                ))
                                                            }
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='text-center'>
                                                <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl mt-2 tw-min-w-60">Ship Orders</button>
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryOrderMapping
