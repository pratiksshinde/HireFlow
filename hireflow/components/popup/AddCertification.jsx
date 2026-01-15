
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { addSingleCertification } from '../../services/editPortfolioService';

function AddCertification({onClose}) {
  const [name , setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");

  const addCertification = async ()=>{
    const response = await addSingleCertification(name,organization,date);
    if(response.success){
        alert("Certificate added");
        onClose();
    }
  }

  return (
    <div >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex flex-col items-center justify-center z-50">
      <span onClick={()=>onClose()} className='top-5 rounded-full bg-white/10 px-2 py-2 m-3 border backdrop-blur-lg border-white/10 bg-opacity-50'><CloseIcon/></span>
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 w-124 shadow-xl">
         <h2 className="text-2xl font-semibold  mb-4">Add New Certification</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              addCertification();
            }}>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Certification Name
                </label>
                <nput
                type="text"
                
                id="CertificationName"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Certification's Name"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Issuing Organization
                </label>
                <input
                type="text"
                id="organization"
                
                value={organization}
                onChange={(e)=>setOrganization(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Issueing Organization Name"
                />
            </div>
            <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Issue Date
                </label>
                <input
                type="date"
                
                id="date"
                value={date}
                onChange={(e)=>{setDate(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add your Link"
                />
            </div>
            
            <div className='flex justify-center gap-3'>
             <div className="flex ">
                <button
                type="submit"
                className="bg-green/10 backdrop-blur-sm hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
            </div>
           
            </div>
            </form> 
            </div>
        </div>
    </div>
  )
}

export default AddCertification