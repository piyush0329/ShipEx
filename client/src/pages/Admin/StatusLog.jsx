import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import { useAuth } from '../../context/auth'
const { Option } = Select

const StatusLog = () => {
    const [auth] = useAuth()
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [orders, setOrders] = useState([])
    const [offices, setOffices] = useState([])
    const [selectedOffice, setSelectedOffice] = useState(null)
    const getVehicles = async () => {
        try {
            const { data } = await axios.get('/get-working-vehicle')
            setVehicles(data.vehicles)
        } catch (error) {
            console.log(error)
        }
    }
    const getVehicleOrder = async () => {
        try {
            const vehicleId = selectedVehicle
            if (vehicleId !== null) {
                const { data } = await axios.get(`/get-vehicle-orders/${vehicleId}`)
                setOrders(data.order_details)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const getOffices = async () => {
        try {
            const { data } = await axios.get('/get-office')
            setOffices(data.offices)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getOffices()
    }, [])
    useEffect(() => {
         getVehicleOrder()
    // eslint-disable-next-line
    }, [selectedVehicle,vehicles])
    useEffect(() => {
        getVehicles()
        // eslint-disable-next-line 
    }, [])

    const handleCreateLog = async(e)=>{
        e.preventDefault()
        try {
            if(selectedOffice!==null){
                const {data}= await axios.post('/order-log',{location:selectedOffice, orders,user:auth.user._id })
                if(data?.success){
                    alert(data?.message)
                    getVehicles()
                }
            }else{
                alert('Select Location to create log')
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
    return (
        <>
            <div className="container-fluid dashboard tw-bg-lightGrey">
                <div className="row">
                    <div className="col-12 col-md-2 p-0">
                        <AdminMenu />
                    </div>

                    <div className="col-12 col-md-10 p-0">
                        <div className="card p-3 tw-bg-light">
                            <h4 className='text-center'>Create Current Location Log</h4>
                            <div>Select Vehicle:</div>
                            <Select value={selectedVehicle} className='tw-min-w-80' onChange={(e) => { setSelectedVehicle(e); }}>
                                <Option disabled value={null}>
                                    Select any option
                                </Option>
                                {vehicles?.map((v, i) => (
                                    <Option key={i} value={v._id}>
                                        {"Number:" + v.vehicleNo}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        {
                            selectedVehicle &&
                            <div className="card p-3 tw-bg-light mt-2">
                                <h3 className='text-center'>Orders Associated With Vehicle</h3>
                                <div className='mt-2 row'>
                                    {
                                        orders?.map((o, i) => (
                                            <div key={i} className="col-12 col-md-4 tw-card tw-w-80 mt-2 mx-2 tw-bg-base-100 tw-shadow-xl">
                                                <div className="tw-card-body">
                                                    <h2 className="tw-card-title">{o.products[0].description}</h2>
                                                    <div><strong>Start Location:</strong> {o.startLocation.officeName}</div>
                                                    <div><strong>Destination Location:</strong> {o.destinationLocation.officeName}</div>
                                                    <div><strong>Shipment Weight</strong> {o.products[0].weight}kg</div>
                                                    <div><strong>Shipping Charge:</strong> {o.totalAmount}</div>

                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                <div className='mt-4'>
                                    {
                                        orders.length > 0 &&
                                        <form onSubmit={handleCreateLog} className='tw-card tw-bg-base-100 tw-shadow-xl'>
                                            <div className='tw-card-body'>
                                                <div className="mb-2">
                                                    <label className="form-label">Current Location: </label>
                                                    <Select value={selectedOffice} className='w-100' onChange={(e) => { setSelectedOffice(e); }}>
                                                        <Option disabled value={null}>
                                                            Select any option
                                                        </Option>
                                                        {offices?.map((office, i) => (
                                                            <Option key={i} value={office._id}>
                                                                {office.officeName}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div>
                                                    <button type='submit' className='w-100 tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl'>
                                                        Create Log
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default StatusLog
