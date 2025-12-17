
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { addSingleArchivement } from '../../services/editPortfolioService';


function AddArchivement({onClose}) {
  const [name , setName] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addArchivement = async ()=>{
    const response = await addSingleArchivement(name,Description);
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
         <h2 className="text-2xl font-semibold  mb-4">Add New Archivement</h2>
            <form onSubmit={(e)=>{
              e.preventDefault();
              addArchivement();
            }}>
             <div className="mb-4">

                <label className="block text-sm font-bold mb-2" htmlFor="categoryName">
                Title
                </label>
                <input
                type="text"
                
                id="ArchivementName"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Archivement Title"
                />
            </div>
            <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="skillName">
                Description
                </label>
                <textarea
                type="text"
                id="Description"
                
                value={Description}
                onChange={(e)=>setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full h-54 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Write Description"
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

export default AddArchivement