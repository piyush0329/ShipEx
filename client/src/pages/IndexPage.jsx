import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

const IndexPage = () => {

  return (


    <div className='tw-bg-lightGrey'>

      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img style={{ height: 500, objectFit: 'fill' }} src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 rounded" alt="..." />
          </div>
          <div className="carousel-item">
            <img style={{ height: 500, objectFit: 'fill' }} src="https://images.pexels.com/photos/5025643/pexels-photo-5025643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 rounded" alt="..." />
          </div>
          <div className="carousel-item">
            <img style={{ height: 500, objectFit: 'fill' }} src="https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 rounded" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <div className="container row">

        <div className="col-sm-7">
          <div className="page-content">
            <h2 className="heading" style={{ margin: '0px', padding: '0px', fontSize: '110%', position: 'relative', fontWeight: '600px', marginBottom: '16px', paddingBottom: '16px', }}>Our Story</h2>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum debitis fugiat deserunt ex labore quas delectus? Ullam asperiores voluptates tenetur laborum libero sint, architecto optio voluptatem nihil eius cupiditate commodi. Tempora aut error, similique magnam quaerat, omnis saepe in ipsa delectus animi veniam nesciunt. Maiores repellat natus neque quaerat optio repudiandae illo? Officiis nihil et pariatur quo cumque mollitia. Eveniet rerum laudantium quam dolor officiis? Earum ducimus sit porro veritatis tempora autem dolorem minima placeat doloremque, eaque eum rerum amet laboriosam sed dolorum dicta sint nam assumenda deserunt quam ipsum quod at.
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi unde neque reprehenderit ut sequi quam, omnis numquam quasi. Dolores adipisci perferendis ut fugit sequi impedit, consectetur dicta cumque nulla illum, vitae, deserunt laborum. Magnam voluptas amet mollitia distinctio alias dolorem id, nulla magni pariatur porro earum vitae aliquid adipisci eos.
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eaque similique cumque, aspernatur assumenda temporibus impedit. Mollitia modi, facilis perspiciatis dignissimos quia molestias quas libero, tempore nesciunt velit sapiente quaerat.
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestias deleniti aut deserunt repellat cupiditate praesentium inventore fuga consequuntur? Aperiam!
            </p>
          </div>
        </div>
        <div className="col-12 col-sm-5">
          <img className='rounded img-fluid' src='https://images.unsplash.com/photo-1543499459-d1460946bdc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cmllcnxlbnwwfHwwfHx8MA%3D%3D' alt='...' />
        </div>
      </div>
      <br></br>

      <section className="pt-5 pb-5 p-relative text-bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-color-quaternary text-center  mb-0 font-weight-semibold text-capitalize ">Our Services</h2>
              <center><div className="heading-bottom-border mb-4 " /></center>
            </div>
          </div>
          <div className="pt-3 row justify-content-center justify-lg-content-between">
            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
              <div className="card">
                <Link
                  to={'shipex/services'}>
                  <img className="card-img-top" src="https://www.dtdc.in/img/icons/express-parcels.jpg" alt="Express Parcels" /></Link>
                <div className="card-body">
                  <Link
                    to={'shipex/services'} style={{ textDecoration: 'none' }}>
                    <h4 className="card-title mb-1 text-4 font-weight-bold">Express Parcels</h4>
                  </Link>
                  <p className="card-text mb-2 pb-1">The Express Parcels Vertical offers a wide range of domestic products and services catering to C2C and B2B customers for documents and parcels of all sizes including part-truck-load shipments... </p>
                  <Link
                    to={'shipex/services'} className="read-more text-color-primary font-weight-semibold text-2">Read More <i className="fas fa-angle-right position-relative top-1 ms-1" /></Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
              <div className="card">
                <Link
                  to={'shipex/services'}>
                  <img className="card-img-top" src='https://www.dtdc.in/img/icons/international.jpg' alt="International Shipments" /></Link>
                <div className="card-body">
                  <Link
                    to={'shipex/services'} style={{ textDecoration: 'none' }}>
                    <h4 className="card-title mb-1 text-4 font-weight-bold">International Shipments
                    </h4>
                  </Link>
                  <p className="card-text mb-2 pb-1">We provide shipping to over 220 destinations by leveraging our tie-ups with international partners and our own offices in major commerce centers across the globe. Our wide range of international shipping solutions are...</p>
                  <Link
                    to={'shipex/services'} className="read-more text-color-primary font-weight-semibold text-2">Read More <i className="fas fa-angle-right position-relative top-1 ms-1" /></Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
              <div className="card">
                <Link
                  to={'shipex/services'}>
                  <img className="card-img-top" src="https://www.dtdc.in/img/icons/integrated-ecommerce-logistics.jpg" alt="Integrated E-commerce Logistics" /></Link>
                <div className="card-body">
                  <Link
                    to={'shipex/services'} style={{ textDecoration: 'none' }}>
                    <h4 className="card-title mb-1 text-4 font-weight-bold">Integrated E-commerce Logistics
                    </h4>
                  </Link>
                  <p className="card-text mb-2 pb-1">Our Integrated E-commerce Logistics is an end-to-end solution specifically designed for e-commerce companies who need quick and reliable logistics to gain a competitive edge. From pick-up...</p>
                  <Link
                    to={'shipex/services'} className="read-more text-color-primary font-weight-semibold text-2">Read More <i className="fas fa-angle-right position-relative top-1 ms-1" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="about-me pt-5">
        <div className="container">
          <div className="row">
            <div className="col-xs-2 col-lg-2">
            </div>
            <div className="col-xs-8 col-lg-8 ">
              <h2 className="text-color-quaternary text-center font-weight-semibold text-capitalize mb-0 ">Our Unique Value Proposition</h2>
              <center><div className="heading-bottom-border mb-4 " /></center>
            </div>
            <div className="col-xs-2 col-lg-2">
            </div>
          </div>
          <div className="row">
            <div className="col-xs-1 col-lg-1" />
            <div className="col-xs-10 col-lg-10" >
              <div className="featured-boxes featured-boxes-style-3 mt-5">
                <div className="row">
                  <div className="col-lg-4 mb-3">
                    <div className="featured-box featured-box-primary featured-box-effect-3">
                      <div className="box-content">
                        <img className='rounded' src="https://www.dtdc.in/img/icons/experience.png" alt="30+ years of Experience" />
                        <h4 className="font-weight-normal text-5 mt-3">30+ years of Experience
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="featured-box featured-box-tertiary featured-box-effect-3">
                      <div className="box-content">
                        <img src="https://www.dtdc.in/img/icons/icon-globe-maps.png" alt="Wide Spread Network" />
                        {/*<i class="icon-featured far fa-star top-0"></i>*/}
                        <h4 className="font-weight-normal text-5 mt-3">Wide Spread Network
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="featured-box featured-box-quaternary featured-box-effect-3">
                      <div className="box-content">
                        <img src="https://www.dtdc.in/img/icons/modern-technology.png" alt="Modern Technology" />
                        {/*<i class="icon-featured far fa-edit top-0"></i>*/}
                        <h4 className="font-weight-normal text-5 mt-3">Modern Technology
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 mb-3">
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="featured-box featured-box-quaternary featured-box-effect-3">
                      <div className="box-content">
                        <img src="https://www.dtdc.in/img/icons/customised-solutions.png" alt="Customised Solutions" />
                        {/*<i class="icon-featured far fa-edit top-0"></i>*/}
                        <h4 className="font-weight-normal text-5 mt-3">Customised Solutions
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="featured-box featured-box-quaternary featured-box-effect-3">
                      <div className="box-content">
                        <img src="https://www.dtdc.in/img/icons/robust-infrastructure.png" alt="Robust Infrastructure" />
                        <h4 className="font-weight-normal text-5 mt-3">Robust Infrastructure</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

  )
}

export default IndexPage
