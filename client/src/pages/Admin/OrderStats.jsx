import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'

import {
    Chart as ChartJS,

    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
// import './citation_script'
ChartJS.register(BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend)
const OrderStats = () => {
    const [stats, setStats] = useState([])
    const [paymentOrderStats, setPaymentOrderStats] = useState([])
    const [orderStatusBased, setOrderStatusBased] = useState([])
    const GetOrderStats = async () => {
        try {
            const { data } = await axios.get('/order-statistics')
            if (data.orderStats) {
                setStats(data.orderStats)
                setPaymentOrderStats(data.orderPaymentBased)
                setOrderStatusBased(data.orderStatusBased)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetOrderStats()
    }, [])
    const labels = stats.map((entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`)
    const totalOrdersData = stats.map((entry) => entry.totalOrders)
    const totalAmountData = stats.map((entry) => entry.totalAmount)


    const labels2 = paymentOrderStats.map((entry) => entry._id)
    const totalOrdersPayment = paymentOrderStats.map((entry) => entry.count)

    const labels3 = orderStatusBased.map((entry) => entry._id)
    const totalOrderStatusBased = orderStatusBased.map((entry) => entry.count)



    const data = {
        labels,
        datasets: [
            {
                label: 'Total Amount',
                backgroundColor: "rgba(80, 80, 80, .3)",
                borderColor: "rgba(80, 80, 80, 1)",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(80, 80, 80, 0.8)",
                hoverBorderColor: "rgba(80, 80, 80, 1)",
                data: totalAmountData,
            },
        ],
    }
    const data2 = {
        labels,
        datasets: [
            {
                label: 'Total Orders',
                backgroundColor: "rgba(252, 103, 54, 0.3)",
                borderColor: "rgba(252, 103, 54, 1)",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(252, 103, 54, 0.8)",
                hoverBorderColor: "rgba(252, 103, 54, 1)",
                data: totalOrdersData,
            },
        ],
    }
    const data3 = {
        labels: labels2,
        datasets: [
            {
                label: 'Total Orders',
                backgroundColor: "rgba(255, 0, 79, 0.3)",
                borderColor: "rgba(255, 0, 79, 1)",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(255, 0, 79, 0.8)",
                hoverBorderColor: "rgba(255, 0, 79, 1)",
                data: totalOrdersPayment,
            },
        ],
    }
    const data4 = {
        labels: labels3,
        datasets: [
            {
                label: 'Total Orders',
                backgroundColor: "rgba(145, 10, 103, 0.3)",
                borderColor: "rgba(145, 10, 103, 1)",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(145, 10, 103, 0.8)",
                hoverBorderColor: "rgba(145, 10, 103, 1)",
                data: totalOrderStatusBased,
            },
        ],
    }
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font:{
                        weight:'bold',
                        size:14
                    }
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount', 
                    font:{
                        weight:'bold',
                        size:14
                    }
                }, 
            },
        },
    }
    const options2 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date', 
                    font:{
                        weight:'bold',
                        size:14
                    }
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Orders',
                    font:{
                        weight:'bold',
                        size:14
                    }
                }, 
            },
        },
    }
    const options3 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Payment Status',
                    font:{
                        weight:'bold',
                        size:14
                    }
                },
                
            },
            y: {
                title: {
                    display: true,
                    text: 'Orders',
                    font:{
                        weight:'bold',
                        size:14
                    }
                },
                
            },
        },
    }
    const options4 = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Order Status',
                    font:{
                        weight:'bold',
                        size:14
                    }
                },    
            },
            y: {
                title: {
                    display: true,
                    text: 'Orders',
                    font:{
                        weight:'bold',
                        size:14
                    }
                },
               
            },
        },
    }

    return (
        <div>
            <div className="container-fluid dashboard tw-bg-lightGrey">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminMenu />
                    </div>
                    <div className="col-md-10 p-0">
                        <div className="card p-3 tw-bg-light">
                            <h4 className='text-center'>Orders Statistics</h4>
                            <div>
                                <div className='row'>
                                    <div className='col-12 col-md-6'>
                                        <Bar data={data2} options={options2} />
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Bar data={data3} options={options3} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12 col-md-6'>
                                        <Bar data={data} options={options} />
                                    </div>
                                    <div className='col-12 col-md-6'>
                                        <Bar data={data4} options={options4} />
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

export default OrderStats
