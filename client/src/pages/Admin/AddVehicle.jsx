import React, { useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'


const AddVehicle = () => {

    const [vehicleNo, setVehicleNo] = useState('')
    const [capacity, setCapacity] = useState('')
    const [driver, setDriver] = useState('')
    const [model, setModel] = useState('')

    const handleCreateVehicle = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/add-vehicle', { vehicleNo, model, capacity, driver })
            if (data?.error) {
                alert(data.error)
            }
            else if (data?.success) {
                setVehicleNo('')
                setCapacity('')
                setDriver('')
                setModel('')
                alert("Vehicle added Successfully")
            }
            else if (!data?.success) {
                alert("Vehicle Already Registered")
            }
            else {
                alert("Error while adding vehicles")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container-fluid dashboard tw-bg-lightGrey'>
            <div className='row'>
                <div className='col-md-2 p-0 tw-h-full'>
                    <AdminMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <div className='card p-3 tw-bg-light'>
                        <h4 className='text-center'>Add Vehicle</h4>
                        <div className='d-flex flex-column'>
                            <div className=''>
                                <form onSubmit={handleCreateVehicle}>
                                    <div className="mb-3">
                                        <label className="form-label">Vehicle Number*</label>
                                        <input type="text" value={vehicleNo} required onChange={(e) => setVehicleNo(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Vehicle Model*</label>
                                        <input type="text" value={model} required onChange={(e) => setModel(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Driver Name*</label>
                                        <input type="text" value={driver} required onChange={(e) => setDriver(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Capacity(kg)* </label>
                                        <input type="number" value={capacity} required onChange={(e) => setCapacity(e.target.value)} className="form-control" />
                                    </div>
                                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Add Vehicle</button>
                                </form>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVehicle
