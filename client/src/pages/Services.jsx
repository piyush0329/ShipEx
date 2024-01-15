import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'

const Services = () => {

    const [offices, setOffices] = useState([])
    const [startLocation, setStartLocation] = useState()
    const [destinationLocation, setDestinationLocation] = useState()
    const [weight, setWeight] = useState()
    const [description, setDescription] = useState()
    const [shipmentValue, setShipmentValue] = useState()
    const [price, setPrice] = useState()
    const [cart,setCart]= useCart()
    const [auth]=useAuth()

    // eslint-disable-next-line
    const fetchOffices = async () => {
        try {
            const { data } = await axios.get(`/get-office`)
            if (data?.success) {
                setOffices(data?.offices)

            } else {
                alert("error in fetching offices")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchOffices()
        // eslint-disable-next-line
    }, [])

    const calculatePrice = async (e) => {
        e.preventDefault()
        try {           
            if(!startLocation || !destinationLocation || !weight || !shipmentValue){
                alert('all fields required')
            }else{
                const {data} =await axios.post('/get-price',{startLocation, destinationLocation, weight, shipmentValue})
                if (data?.success) {
                    setPrice(data?.price.toFixed(2))
                } else {
                    alert("error in calculating Price")
                }
            }   
        } catch (error) {
            console.log(error)    
        }
    }
    const handleAddToPayment = async (e) => {
        e.preventDefault()
        try {
               if(price){
                const {data}= await axios.post(`/add-product`,{startLocation,destinationLocation,weight,description,shipmentValue,price,userid:auth.user._id})
                if (data?.success) {
                    setCart([...cart,data.updatedProduct])
                    alert('product added to cart')
                } else {
                    alert("error in adding Product")
                }
               }else{
                alert('you have to calculate the price first')
               }
        } catch (error) {
            console.log(error)    
        }
    }
    return (
        <div>
            <section className="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-2" style={{ backgroundImage: 'none', backgroundColor: '#0E2C53' }}>
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 align-self-center p-static order-2 text-left">
                            <h1 className="text-9 text-white abox-shadow-1">ShipEx Services
                            </h1>
                            <div className="heading-bottom-border" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="container col-lg-12 pb-sm-4 pb-lg-0 pe-lg-5">
                The Express Parcels Vertical offers a wide range of domestic products and services catering to C2C and B2B customers for documents and parcels of all sizes including part-truck-load shipments. Our product offerings range from time-sensitive express services to cost-effective ground express solutions. Our extensive delivery network currently reaches 96% of India’s population, making it easy for you to send documents and parcels of any size to almost anywhere in India.
            </div>
            <div className="row pt-3 ">
                <div className="col-sm-8 col-md-6 col-lg-6  position-relative mb-lg-0">
                    <img src="https://www.dtdc.in/img/icons/express-parcels.jpg" alt="express-services" className="img-fluid abox-shadow-1 rounded" />
                </div>
                <div className="col-lg-6 pb-sm-4 pb-lg-0 pe-lg-5 ">
                    <h1 className="text-color-dark font-weight-normal mb-2 text-7 mobilepadding-top-20"><strong>Services
                    </strong></h1>
                    <div className="heading-bottom-border mb-4 " />
                    <p>
                        Want to send important documents or small-to-medium sized parcels urgently? Our Express Service prioritises time-sensitivity and is ideal for meeting urgent delivery requirements. You can choose between our Premium and Standard express services based on your urgency and budget.
                    </p>
                    <h6 className="font-weight-bold">ShipEx Standard </h6>
                    <p>
                        Our Express Standard service optimises the pick-up and drop-off timings to provide you with express delivery at reasonable cost. We transport your parcels safely via multi modal logistics.
                    </p>
                    <h6 className="font-weight-bold">ShipEx Premium</h6>
                    <p>
                        Our Express Premium service is an ideal solution if you need parcels delivered within a very short timeframe. Since it is a premium service, we offer day-definite and time-definite services for urgent shipments. To meet our customers’ tighter delivery schedules, we leverage our collaboration with all major airlines to move your shipments at our fastest turnaround time.
                    </p>
                    <h6 className="font-weight-bold">ShipEx Assure™</h6>
                    <p>
                        Book Express Premium shipments with DTDCShipAssure™ - our 100% Money Back Guarantee if we fail to deliver within Expected Date of Delivery. DTDCShipAssure™ is a promise from DTDC where we assure you of timely delivery and in case we fail, you will receive a complete refund of your booking amount.
                    </p>
                </div>
            </div>
            <div className="card text-bg-light mb-3">
                <div className="card-header text-center display-6"><strong>Book Shipment</strong></div>
                <div className="card-body text-center">
                    <div className='row'>
                        <div className="col-12 col-sm-5">
                            <img className='rounded img-fluid' src='https://images.unsplash.com/photo-1612630741022-b29ec17d013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y291cmllcnxlbnwwfHwwfHx8MA%3D%3D' alt='...' />
                        </div>
                        <div className="col-12 col-sm-7 mt-2">
                            <form className='text-start'>
                                <div className="mb-3">
                                    <label className="form-label">Start Location *</label>
                                    <select onChange={(e) => setStartLocation(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option selected>Select Start Location</option>
                                        {
                                            offices?.map((o) => (
                                                <option key={o._id} value={o._id}>{o.officeName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Destination Location *</label>
                                    <select onChange={(e) => setDestinationLocation(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option selected>Select Destination Location</option>
                                        {
                                            offices?.map((o) => (
                                                <option key={o._id} value={o._id}>{o.officeName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">weight(kg) *</label>
                                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description *</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Shipment Value(INR) *</label>
                                    <input type="number" value={shipmentValue} onChange={(e) => setShipmentValue(e.target.value)} className="form-control" />
                                </div>
                                <div className="mb-3">

                                    <label className="form-label d-block">Price of Shipping *</label>
                                    <input type="number" disabled value={price} onChange={(e) => setPrice(e.target.value)} className="form-control d-inline w-75" />
                                    <button onClick={calculatePrice} className='btn btn-outline-secondary mx-2' >Calculate Price</button>
                                    <div id="passwordHelpBlock" className="form-text">
                                        Click on the button to calculate price of shipping..
                                    </div>
                                </div>
                                <button type="submit" onClick={handleAddToPayment} className="btn btn-outline-success">Add to Cart</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
