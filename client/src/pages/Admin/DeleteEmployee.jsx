import axios from 'axios';
import React, { useState } from 'react'


const DeleteEmployee = () => {

    const [email, setEmail] = useState('')

    const handleDeleteEmployee = async (e) => {
        e.preventDefault()
        try {
            const { data,status } = await axios.delete(`/delete-employee/${email}`);
            if (data?.success) {
                alert("Employee Deleted Successfully");
                setEmail('')
            } else if(status===200 && !data?.success){
                alert("Employee doesn't exist or email doesn't belong to valid Employee")
            }  
            else {
                alert("error while deleteing Employee")
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }
    return (
        <>
        
            <form onSubmit={handleDeleteEmployee}>
                <div className='m-4'>
                    <div className="mb-3">
                        <label className="form-label d-block">Employee Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-75 d-inline" />
                        <button type='submit' className="tw-btn tw-btn-outline tw-bg-red text-white tw-rounded-xl mx-2" >Delete Employee</button>
                    </div>
                </div>
            </form>
            

        </>














    )



}

export default DeleteEmployee
