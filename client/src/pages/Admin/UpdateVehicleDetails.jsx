import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { Select } from 'antd'
import axios from 'axios'
const { Option } = Select

const UpdateVehicleDetails = () => {
    const [vehicleNo, setVehicleNo] = useState('')
    const [capacity, setCapacity] = useState('')
    const [driver, setDriver] = useState('')
    const [model, setModel] = useState('')
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)

    const getVehicles = async () => {
        try {
            const { data } = await axios.get('/get-all-vehicle')
            setVehicles(data?.vehicles)

        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateVehicle = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/update-vehicle',
                {
                    vehicleNo: vehicleNo,
                    capacity: capacity,
                    driver: driver,
                    model_name: model
                })
            if (data.success) {
                alert('vehicle details updated successfully')
            } else {
                alert('vehicle is in working stage cannot be updated')
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const getSelectedVehicleData = async () => {
            try {
                if (selectedVehicle !== null) {
                    const { data } = await axios.get(`/get-vehicle/${selectedVehicle}`)

                    setCapacity(data.vehicle.capacity)
                    setVehicleNo(data.vehicle.vehicleNo)
                    setDriver(data.vehicle.driver)
                    setModel(data.vehicle.model_name)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getSelectedVehicleData()
    }, [selectedVehicle])
    useEffect(() => {
        getVehicles()
        // eslint-disable-next-line 
    }, [])
    return (
        <div className='container-fluid dashboard tw-bg-lightGrey'>
            <div className='row'>
                <div className='col-md-2 p-0 tw-h-full'>
                    <AdminMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <div className='card p-3 tw-bg-light'>
                        <h4 className='text-center'>Update Vehicle Details</h4>
                        <div className='d-flex flex-column'>
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
                            <br />
                            {
                                selectedVehicle && <div className=''>
                                    <form onSubmit={handleUpdateVehicle}>
                                        <div className="mb-3">
                                            <label className="form-label">Vehicle Number</label>
                                            <input type="text" value={vehicleNo} disabled required onChange={(e) => setVehicleNo(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Vehicle Model</label>
                                            <input type="text" value={model} required onChange={(e) => setModel(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Driver Name</label>
                                            <input type="text" value={driver} required onChange={(e) => setDriver(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Capacity(kg)</label>
                                            <input type="number" value={capacity} required onChange={(e) => setCapacity(e.target.value)} className="form-control" />
                                        </div>
                                        <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Update Vehicle</button>
                                    </form>
                                </div>
                            }
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateVehicleDetails
