import React, { useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'


const CreateOffice = () => {

    const [officeId, setOfficeId] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('India')
    const [pincode, setPincode] = useState('')
    const [locality, setLocality] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [officeName, setOfficeName] = useState('')

    const handleCreateOffice = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/create-office', { officeId, officeName, state, city, country, pincode, locality, longitude, latitude })
            if (data?.error) {
                alert(data.error)
            }
            else if (data?.success) {
                alert("Office Created Successfully")
                setOfficeId('')
                setState('')
                setCity('')
                setPincode('')
                setLocality('')
                setLongitude('')
                setLatitude('')
                setOfficeName('')
            }
            else {
                alert("Error while Creating Office")
            }
        } catch (error) {
            console.log(error)

        }
    }
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLongitude(longitude)
                    setLatitude(latitude)
                },
                (err) => {
                    console.log(err)
                    alert(err.message);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };
    return (
        <div className='container-fluid dashboard tw-bg-lightGrey'>

            <div className='row'>
                <div className='col-md-2 p-0'>
                    <AdminMenu />
                </div>
                <div className='col-md-10 p-0'>
                    <div className='card p-3 tw-bg-light'>
                        <h4 className='text-center'>Create Office</h4>
                        <div className='d-flex flex-column'>
                            <div className=''>
                                <form onSubmit={handleCreateOffice}>
                                    <div className="mb-3">
                                        <label className="form-label">Office Id</label>
                                        <input type="number" value={officeId} onChange={(e) => setOfficeId(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Office Name</label>
                                        <input type="text" value={officeName} onChange={(e) => setOfficeName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Locality / Landmark</label>
                                        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">State</label>
                                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Country</label>
                                        <input type="text" disabled value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pin Code</label>
                                        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Longitude</label>
                                        <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} onFocus={getLocation} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Latitude</label>
                                        <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="form-control" />
                                    </div>
                                    <button type="submit" className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl">Create Office</button>
                                </form>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOffice
